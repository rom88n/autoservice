FROM node:10-alpine
RUN apk add --update --no-cache --virtual .gyp g++ make python git

RUN mkdir -p /frontend

WORKDIR /frontend

COPY package*.json ./

RUN yarn install --production
COPY . .

EXPOSE 3000

#CMD "npm" "run" "dev"
