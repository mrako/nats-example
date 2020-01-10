FROM node:alpine

WORKDIR /app

COPY package*.json /app/

RUN apk add --no-cache --virtual .build-deps alpine-sdk python \
 && npm ci \
 && apk del .build-deps


COPY . /app

CMD [ "npm", "start" ]
