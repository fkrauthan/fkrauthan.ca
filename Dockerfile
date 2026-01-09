# Build static site
FROM node:24-alpine AS builder
WORKDIR /app

RUN apk add --no-cache gzip brotli
RUN corepack enable pnpm

COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN IS_DOCKER_BUILD=true pnpm build


# Build header config file
FROM alpine:latest AS config-builder

RUN cat <<'EOF' > /sws.toml
[advanced]

[[advanced.headers]]
source = "/_next/static/**"
[advanced.headers.headers]
Cache-Control = "public, max-age=31536000, immutable"

[[advanced.headers]]
source = "**/*.{ico,png,jpg,jpeg,gif,webp,svg,woff,woff2,ttf,eot}"
[advanced.headers.headers]
Cache-Control = "public, max-age=86400"

[[advanced.headers]]
source = "**/*.html"
[advanced.headers.headers]
Cache-Control = "no-cache"

[[advanced.headers]]
source = "**/*"
[advanced.headers.headers]
X-Content-Type-Options = "nosniff"
X-Frame-Options = "DENY"
Referrer-Policy = "strict-origin-when-cross-origin"

EOF


# Run server
FROM joseluisq/static-web-server:2

COPY --from=builder /app/out /public

ENV SERVER_PORT=3000
ENV SERVER_COMPRESSION=false
ENV SERVER_COMPRESSION_STATIC=true

ENV SERVER_ROOT=/public
ENV SERVER_ERROR_PAGE_404=/public/404.html
ENV SERVER_REDIRECT_TRAILING_SLASH=false
ENV SERVER_HEALTH=true

ENV SERVER_CONFIG_FILE=/etc/sws.toml
COPY --from=config-builder /sws.toml /etc/sws.toml

EXPOSE 3000
