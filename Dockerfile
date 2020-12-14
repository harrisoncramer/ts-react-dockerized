# Import v14, which works with CRA
FROM node:14 AS build

# Stage 0, "build", based on Node.js, to build and compile the frontend
WORKDIR /app

# Move package.json to app
COPY package*.json /app/

# Build application
RUN npm install

# Copy the rest of the files
COPY ./ /app/

#RUN CI=true npm test

# Build the application
RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15

# Copy built app from the previous stage
COPY --from=build /app/build/ /usr/share/nginx/html

# Add our own nginx.conf file, which works with React Router
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose Nginx 
EXPOSE 80

# Containers run nginx with global directives and daemon off
CMD ["nginx", "-g", "daemon off;"]
