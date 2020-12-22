# ⚡ Containerized React/Typescript w/ Nginx Reverse Proxy

This is a dockerized frontend application using React and the following technologies:

- Apollo GraphQL for data fetching
- React Router for routing
- Google Analytics for usage tracking and metrics
- Jest for Testing
- Material-UI components for boostrapping
- Node-Sass for CSS
- Use-Query-Params for query string parsing

## Environment

Both the production and development versions of this application run inside a docker container. To get either version up and running, you must install the relevant environment file inside the root of hte project, either `.env.production` or `.env.development`

See the `globals.d.ts` file for the correct variables to use inside these development files.

## Development

To run the project (with hot reloading) run `ENV=development docker-compose up` which will run the application inside a docker container and expose it on `http://localhost:3000` on your local machine.

## Production

To run the application in production, run `ENV=production docker-compose up -d` which will run the application on a docker container and expose that container via PORT 80 on your local machine with `Nginx`serving as a reverse proxy, and run that in detached (`-d`) mode.
