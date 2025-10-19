# Deployment Guide

## Environment Variables

### Required for Production

Create a `.env` file in the project root with the following variables:

```env
# Database Configuration
DB_USER=postgres
DB_PASSWORD=your_secure_password
DB_NAME=rss_feed
DB_PORT=5432

# Google OAuth Credentials
GOOLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Production URL (for CORS)
PRODUCTION_URL=http://65.109.128.10:9595

# Vite Build Variables (used during Docker build)
VITE_APP_URL=http://65.109.128.10:9595
VITE_API_BASE_URL=/api/auth
```

### For Local Development

Create `packages/web/.env`:

```env
# Optional: API base URL (defaults to /api/auth)
VITE_API_BASE_URL=/api/auth

# Optional: App URL for OAuth callbacks (defaults to window.location.origin)
VITE_APP_URL=http://localhost:5173
```

## Docker Deployment

### Build and Run

```bash
# Build with environment variables
docker compose up --build -d

# Or build manually
docker build \
  --build-arg VITE_APP_URL=http://65.109.128.10:9595 \
  --build-arg VITE_API_BASE_URL=/api/auth \
  -t rss-feed .
```

### VPS Deployment

1. Copy `.env.production.example` to `.env` and fill in your values
2. Build and deploy:

```bash
# On your VPS
cd /path/to/rss-feed
git pull
docker compose down
docker compose up --build -d
```

## Key Changes for Production

1. **Auth Client** now uses relative URLs (`/api/auth`) so no CORS issues
2. **Callback URLs** use environment variables or `window.location.origin`
3. **CORS** is configured to allow your production domain
4. **Frontend** is built with environment variables baked in

## Troubleshooting

### CORS Errors

- Ensure `PRODUCTION_URL` is set correctly in `.env`
- Check that your domain is in the CORS allowed origins
- Verify the frontend is using relative URLs (not absolute URLs with different domains)

### OAuth Redirect Issues

- Ensure `VITE_APP_URL` matches your actual production URL
- Update Google OAuth console with correct redirect URIs
- Check that callback URLs don't include `/api/auth` (should be just the base URL)
