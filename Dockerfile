# Use the official Bun image with platform specification
FROM --platform=linux/amd64 oven/bun:1

# Set working directory
WORKDIR /app

# Copy package.json files
COPY package.json bun.lock ./
COPY packages/server/package.json ./packages/server/
COPY packages/web/package.json ./packages/web/

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Set the entrypoint to run server
CMD ["bun", "run", "packages/server/src/index.ts"]


# run docker build --platform linux/amd64 -t your-image-name .
