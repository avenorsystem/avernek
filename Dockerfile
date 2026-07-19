# syntax=docker/dockerfile:1.7

ARG NODE_VERSION=22

# ---------------------------------------------------------
# Shared base
# ---------------------------------------------------------
FROM node:${NODE_VERSION}-bookworm-slim AS base

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1


# ---------------------------------------------------------
# Install dependencies
# Only reruns when package.json or package-lock.json changes
# ---------------------------------------------------------
FROM base AS dependencies

COPY package.json package-lock.json ./

RUN --mount=type=cache,id=avernek-npm-cache,target=/root/.npm,sharing=locked \
    npm ci \
    --no-audit \
    --no-fund \
    --prefer-offline


# ---------------------------------------------------------
# Build application
# ---------------------------------------------------------
FROM base AS builder

COPY --from=dependencies /app/node_modules ./node_modules

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