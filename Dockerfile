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
RUN npm run build

# Install NGINX
FROM nginx:alpine

# Copy over node files into Nginx
COPY --from=build /app/build /usr/share/nginx.html

# Add our own nginx.conf file, which works with React Router
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

# Expose port 80
EXPOSE 80

# Containers run nginx with global directives and daemon off
CMD ["nginx", "-g", "daemon off;"]
