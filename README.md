# ⚡ Containerized React/Typescript w/ Nginx Reverse Proxy

- Apollo GraphQL
- React Router
- Google Analytics
- Jest for Testing
- Material-UI components
- Node-Sass for CSS
- Use-Query-Params

## Environment

Must install `.env` files in the root of the folder for development, `.env.development` and for production, `.env.production` to run the application correctly. See the `globals.d.ts` file for the correct variables and types.

## Development

First install the dependencies: `npm install`

Then run the application with `npm start`

## Deployment

Build image: `docker build -t username/nginx-react-app`
Push: `docker push username/nginx-react-app`
Pull (on server): `docker run --rm -it -p 80:80 kingofcramers/nginx-react:new`
