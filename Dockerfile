# Import v14, which works with CRA
FROM node:14 AS nodebuild

# Set working directory
WORKDIR /app

# Copy package and install node modules
COPY ./package.json /app/package.json
RUN npm install 

# Copy rest of files (except for those in .dockerfile)
# and compile + build into the /app/build folder
COPY . .
RUN npm build

# Install NGINX
FROM nginx:alpine

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from nodebuild stage
COPY --from=nodebuild /app/build .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]

