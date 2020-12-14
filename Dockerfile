# Import v14, which works with CRA
FROM node:14 AS builder

# Set working directory
WORKDIR /app

# Copy package and install node modules
COPY ./package.json /app/package.json
RUN npm install && npm build

# Copy rest of files (except for those in .dockerfile)
COPY . .

# Install NGINX
FROM nginx:alpine

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=builder /app/build .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]

