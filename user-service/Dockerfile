# =========================
# 1️⃣ BUILD STAGE
# =========================
FROM node:18-alpine AS builder

WORKDIR /app

# ✅ Install production dependencies only
COPY package*.json ./
RUN npm ci --only=production

# ✅ Copy source code AFTER deps for layer caching
COPY . .

# =========================
# 2️⃣ RUNTIME STAGE
# =========================
FROM node:18-alpine

WORKDIR /app

# ✅ Add non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# ✅ Copy production artifacts only
COPY --from=builder /app /app

# ✅ Environment variables
ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

# ✅ Start app as PID 1
CMD ["node", "server.js"]
