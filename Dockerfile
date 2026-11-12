# syntax=docker/dockerfile:1

# --- базовый образ -----------------------------------------------------------
FROM node:26-alpine AS base
# libc6-compat нужен нативным бинарникам (SWC, Tailwind Oxide) на musl
RUN apk add --no-cache libc6-compat
WORKDIR /app

# --- зависимости ------------------------------------------------------------
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# --- сборка -----------------------------------------------------------------
FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# --- рантайм ----------------------------------------------------------------
FROM base AS runner
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup -S -g 1001 nodejs \
 && adduser -S -u 1001 -G nodejs nextjs

# output: "standalone" уже содержит server.js и только нужные node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Кэш ISR / use cache / оптимизированных картинок: монтируется volume'ом
RUN mkdir -p /app/.next/cache && chown -R nextjs:nodejs /app/.next

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
