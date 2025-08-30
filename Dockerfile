# Use a minimal and secure base image
FROM nginx:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Copy static assets
COPY index.html .
COPY style.css .
COPY script.js .

# Fix permissions: readable by all, owned by root
RUN chmod -R 644 /usr/share/nginx/html && \
    chown -R root:root /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Healthcheck for orchestration
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost || exit 1
