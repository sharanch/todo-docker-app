# Use a minimal and secure base image
FROM nginx:alpine

# Set working directory for clarity and consistency
WORKDIR /usr/share/nginx/html

# Copy static assets into the container
COPY index.html .
COPY style.css .
COPY script.js .

# Ensure correct file permissions (optional but good for portability)
RUN chmod -R 644 /usr/share/nginx/html && \
    chown -R nginx:nginx /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Healthcheck for container orchestration (optional but useful)
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost || exit 1
