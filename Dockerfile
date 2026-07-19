# syntax=docker/dockerfile:1.7

# ---------------------------------------------------------
# Application image
# ---------------------------------------------------------
# Consumes the prebuilt dependencies image (see Dockerfile.deps) as its build
# base, then produces a minimal standalone Next.js runtime. Because the build
# stage starts FROM the deps image, that image must be built first:
#
#   docker build -f Dockerfile.deps -t avenor-website-deps:latest .
#   docker build -f Dockerfile --build-arg DEPS_IMAGE=avenor-website-deps:latest -t avenor-website:local .
#
# ./build.sh (and the Jenkinsfile) run both steps for you.

ARG NODE_VERSION=22
ARG DEPS_IMAGE=avenor-website-deps:latest


# ---------------------------------------------------------
# Build application
# node_modules is already present from the deps image.
# ---------------------------------------------------------
FROM ${DEPS_IMAGE} AS builder

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

# .dockerignore prevents node_modules, .next, .git and env files
# from being copied into this layer.
COPY . .

RUN --mount=type=secret,id=env_file,target=/app/.env.local,required=false \
    --mount=type=cache,id=avernek-next-cache,target=/app/.next/cache,sharing=locked \
    npm run build


# ---------------------------------------------------------
# Minimal production runtime
# ---------------------------------------------------------
FROM node:${NODE_VERSION}-bookworm-slim AS runner

WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000

RUN groupadd --system --gid 1001 nodejs \
    && useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public

COPY --from=builder --chown=nextjs:nodejs \
    /app/.next/standalone ./

COPY --from=builder --chown=nextjs:nodejs \
    /app/.next/static ./.next/static

# Needed for ISR cache and runtime image optimization
RUN mkdir -p .next/cache \
    && chown -R nextjs:nodejs .next

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
