# 🚀 Containerized Typescript React Application

This is a dockerized frontend application using React and the following technologies:

- Apollo GraphQL for data fetching
- React Router for routing
- Google Analytics for usage tracking and metrics
- Jest for Testing
- React Bootstrap
- Node-Sass for SCSS

It's built to use a GraphQL backend, like [this](https://github.com/KingOfCramers/typeorm-typegrapqhl-api) one.

## Development

1. Define any additional development variables inside a `.env.development` file. By default, the `.env.development` file doesn't require any variables, but it must exist.
2. You can start up the server with the `./dock dev start` by using the supplied bash script. Alternatively, run the `docker-compose` command by hand: `PORT=3000 docker-compose -f docker-compose.dev.yml up` which will run your application locally, and expose it on `http://localhost:3000`

## Testing

1. Define any additional variables inside a `.env.test` file. By default, the `.env.test` file doesn't require any variables, but it must exist.
2. Run tests with the `./dock test start` command, or run the `docker-compose` command by hand: `docker-compose -f docker-compose.test.yml run --rm react_test`

## Production

In production, this application is built into static assets and served up with Nginx.

The full application is designed to be run through kubernetes. The configuration files are stored inside the `infrastructure` folder. There is a separate readme for configuring your cluster contained in that folder.

## Installing NPM Packages (development)

1. Install in the running container `docker exec typeorm-api npm install PACKAGE_NAMES`
2. Install the packages locally with `npm install` (no need to specify the packages, because they will get picked up in your package.json file)

Note that you will have to `exec` install in your test container for the packages to be used there as well.

## Logs

Use the `./dock dev logs` command to follow the logs in development (they'll be hidden if you start your development server with the `--detached` flag).
