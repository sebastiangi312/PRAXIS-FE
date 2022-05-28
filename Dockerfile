FROM node:lts-slim as build


WORKDIR /usr/src/app

COPY . .

RUN npm install


CMD npm start

