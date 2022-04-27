FROM node:lts-slim


WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 4200

CMD npm start

