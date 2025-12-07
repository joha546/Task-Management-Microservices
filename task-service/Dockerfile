# =========================
# 1️⃣ BUILD STAGE
# =========================
FROM node:18-alpine AS builder

WORKDIR /app

# ✅ Copy only dependency files first (Docker layer caching)
COPY package*.json ./

# ✅ Deterministic install (locked)
RUN npm ci --only=production

# ✅ Copy actual source code AFTER deps
COPY . .


# =========================
# 2️⃣ RUNTIME STAGE (CLEAN)
# =========================
FROM node:18-alpine

WORKDIR /app

# ✅ Create non-root user (SECURITY BEST PRACTICE)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# ✅ Copy only production artifacts
COPY --from=builder /app /app

# ✅ Drop root privileges
USER appuser

# ✅ Runtime environment
ENV NODE_ENV=production
ENV PORT=6000

EXPOSE 6000

# ✅ Proper PID 1 execution
CMD ["node", "server.js"]
