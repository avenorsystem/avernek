# syntax=docker/dockerfile:1.7

ARG NODE_VERSION=22


# ---------------------------------------------------------
# Install dependencies
# Rebuilt only when package files change
# ---------------------------------------------------------
FROM node:${NODE_VERSION}-bookworm-slim AS deps

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json ./

RUN --mount=type=cache,id=avenor-npm-cache,target=/root/.npm,sharing=locked \
    npm ci \
    --no-audit \
    --no-fund \
    --prefer-offline


# ---------------------------------------------------------
# Build application
# ---------------------------------------------------------
FROM node:${NODE_VERSION}-bookworm-slim AS builder

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json ./

# .dockerignore must exclude node_modules, .next, .git and local env files
COPY . .

RUN --mount=type=secret,id=env_file,target=/app/.env.local,required=false \
    --mount=type=cache,id=avenor-next-cache,target=/app/.next/cache,sharing=locked \
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

RUN mkdir -p /app/.next/cache \
    && chown -R nextjs:nodejs /app/.next

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]