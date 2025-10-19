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

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the frontend (outputs to packages/server/frontend/dist)
WORKDIR /app/packages/web
RUN pnpm run build

# Change to server directory
WORKDIR /app/packages/server

# Set the entrypoint to run production server with tsx
CMD ["pnpm", "run", "start"]


# run docker build --platform linux/amd64 -t your-image-name .
