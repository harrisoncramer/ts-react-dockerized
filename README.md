# Containerized React/Typescript w/ Nginx Reverse Proxy

This is a dockerized frontend application using React and the following technologies:

- Apollo GraphQL for data fetching
- React Router for routing
- Google Analytics for usage tracking and metrics
- Jest for Testing
- Material-UI components for boostrapping
- Node-Sass for CSS
- Use-Query-Params for query string parsing

## Environment

Both the production and development versions of this application run inside a docker container. The required variables are included in the `docker-compose` files for each environment. You may add additional values to the `.env.development` and `.env.production` files.

## Development

To run the project (with hot reloading) use the `./dock dev start` command, which is a shortcut. You may also specify to run the project on another port (by default it runs on port 3000) with the `-p=3333` flag and in detached mode with the `-d` flag. See the `./dock` script for more information.

## Production

Run the container in production and route traffic using the `./dock prod start` command. That will use the Nginx image as a reverse proxy.

To attach to that container later you can use `docker exec -it CONTAINER_NAME_OR_ID /bin/bash`
