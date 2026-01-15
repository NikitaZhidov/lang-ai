# Dependencies stage
FROM node:20 AS deps
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
COPY apps/client/package*.json ./apps/client/
COPY nx.json ./
COPY tsconfig.base.json ./

# Install dependencies with cache mount for faster rebuilds
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# Builder stage
FROM node:20 AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy workspace config files needed for Nx (before copying everything)
COPY nx.json ./
COPY tsconfig.base.json ./
COPY package*.json ./
COPY apps/client/package.json ./apps/client/
COPY apps/client/next.config.js ./apps/client/
COPY apps/client/tsconfig.json ./apps/client/

# Copy source code
COPY apps/client/src ./apps/client/src
COPY apps/client/public ./apps/client/public

# Build the client app
RUN npx nx build client

# Runner stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy standalone build output
COPY --from=builder /app/apps/client/.next/standalone ./
COPY --from=builder /app/apps/client/.next/static ./apps/client/.next/static
COPY --from=builder /app/apps/client/public ./apps/client/public

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/client/server.js"]
