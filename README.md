# Containerized React/Typescript w/ Nginx Reverse Proxy

This is a dockerized frontend application using React and the following technologies:

- Apollo GraphQL for data fetching
- React Router for routing
- Google Analytics for usage tracking and metrics
- Jest for Testing
- Material-UI components for boostrapping
- Node-Sass for CSS
- Use-Query-Params for query string parsing

It's built to use a GraphQL backend, like [this](https://github.com/KingOfCramers/typeorm-typegrapqhl-api) one.

## Development

1. Define any additional development variables inside a .env.development file. By default, the .env.development file doesn't require any variables, but it must exist.
2. You can start up the server with the `./dock dev start` by using the supplied bash script. You may also specify to run the project on another port (by default it runs on port 3000) with the `-p=3333` flag and in detached mode with the `-d` flag. See the `./dock` script for more information.

## Testing

Use the supplied script: `./dock test start` which will run your scripts inside the Docker container with Jest.

## Production

This project is designed to be deployed to Kubernetes for production. The Ingress controller points to an Nginx service, which will supply your application. The `yaml` files containing the configuration for both of these resources are inside the `infrastructure` folder. 

NOTE: The `yaml` files as-written are directing traffic internal to your cluster to another service called `typeorm` that has a ClusterIP exposed. You will need to setup this [API](https://github.com/KingOfCramers/typeorm-typegrapqhl-api) to respond to these requests. You can theoretically use any GraphQL API that will respond appropriately to the GraphQL requests. See the `src/graphql/queries/index.ts` file for the GQL queries.
