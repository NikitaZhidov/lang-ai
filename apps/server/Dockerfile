# Dependencies stage
FROM node:20 AS deps
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
COPY apps/server/package*.json ./apps/server/
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
COPY apps/server/package.json ./apps/server/
COPY apps/server/webpack.config.js ./apps/server/
COPY apps/server/tsconfig.app.json ./apps/server/
COPY apps/server/tsconfig.json ./apps/server/

# Copy source code
COPY apps/server/src ./apps/server/src

# Build the server app
RUN npx nx build server

# Runner stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy built output and generated package.json
COPY --from=builder /app/apps/server/dist ./dist

# Install only production dependencies from the generated package.json
WORKDIR /app/dist
RUN --mount=type=cache,target=/root/.npm \
    npm ci --only=production

EXPOSE 3001

ENV PORT=3001
ENV NODE_ENV=production

# Run from dist directory where node_modules are installed
CMD ["node", "main.js"]
