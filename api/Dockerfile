FROM node:10.23.0-alpine3.10
RUN apk add --update --no-cache --virtual .gyp g++ make python git

RUN mkdir -p /api

WORKDIR /api

COPY package*.json ./

COPY . .

RUN npm install && npm run build

HEALTHCHECK CMD curl --fail http://localhost:3030 || exit 1

EXPOSE 3030
