FROM node:12-stretch

RUN mkdir -p /srv

WORKDIR /srv

COPY package*.json ./

RUN yarn install
COPY . .
RUN yarn build

EXPOSE 3030
