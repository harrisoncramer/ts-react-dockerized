#################
## FIRST STAGE ##
#################

# Import v14, which works with CRA
FROM node:14.16.0 AS stage1
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --only=production
COPY . ./
RUN npm run build

##################
## SECOND STAGE ##
##################
FROM nginx:1.18.0-alpine
 
# Delete default nginx server configuration
RUN rm /etc/nginx/conf.d/default.conf

# Our Application's NGINX server will be configured inside
# the kubernetes deployment file. This will allow us to
# make changes to our server's routing with ConfigMaps
# And without having to rebuild the Docker image.

# Copy built app from the previous stage into html folder to serve
COPY --from=stage1 /app/build/ /usr/share/nginx/html

# Use the nginx.conf file defined in our kubernetes file, instead of copying it here...
EXPOSE 80

# Containers run nginx with global directives and daemon off
CMD ["nginx", "-g", "daemon off;"]
