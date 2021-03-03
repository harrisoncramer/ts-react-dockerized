# Import v14, which works with CRA
FROM node:14 AS build

WORKDIR /app

COPY package*.json /app/

RUN npm ci

COPY . .

CMD npm run start:development
