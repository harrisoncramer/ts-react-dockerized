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

# Copy built app from the previous stage into html folder to serve
COPY --from=stage1 /app/build/ /usr/share/nginx/html

# Copy over dummy HTML file for testing NGINX routing
COPY --from=stage1 /app/goof/ /usr/share/nginx/html/goof

# Add our own nginx.conf file, which works with React Router
# Then expose port 80 for Nginx to serve up our content
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Containers run nginx with global directives and daemon off
CMD ["nginx", "-g", "daemon off;"]
