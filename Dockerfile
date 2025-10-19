# Use Node.js LTS image
FROM --platform=linux/amd64 node:20-slim

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy pnpm workspace and package files
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY packages/server/package.json ./packages/server/
COPY packages/web/package.json ./packages/web/
COPY packages/shared/package.json ./packages/shared/
COPY packages/mobile/package.json ./packages/mobile/ 2>/dev/null || true

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Change to server directory
WORKDIR /app/packages/server

# Set the entrypoint to run server
CMD ["pnpm", "run", "dev"]


# run docker build --platform linux/amd64 -t your-image-name .
