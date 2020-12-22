# Import v14, which works with CRA
FROM node:14 AS build

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . .

RUN npm run build

# Another stage, based on Nginx
FROM nginx:1.15

# Copy built app from the previous stage into html folder to serve
COPY --from=build /app/build/ /usr/share/nginx/html

# Add our own nginx.conf file, which works with React Router
# Then expose port 80 for Nginx to serve up our content
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Containers run nginx with global directives and daemon off
CMD ["nginx", "-g", "daemon off;"]
