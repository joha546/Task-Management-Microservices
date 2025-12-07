# =========================
# 1️⃣ BUILD STAGE
# =========================
FROM node:18-alpine AS builder

WORKDIR /app

# ✅ Dependency layer caching
COPY package*.json ./
RUN npm ci --only=production

# ✅ Copy source code after deps
COPY . .


# =========================
# 2️⃣ RUNTIME STAGE
# =========================
FROM node:18-alpine

WORKDIR /app

# ✅ Add non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# ✅ Copy production artifacts
COPY --from=builder /app /app

# ✅ Environment variables
ENV NODE_ENV=production
ENV PORT=7000

EXPOSE 7000

# ✅ PID 1 process for proper signal handling
CMD ["node", "server.js"]
