# NATS Example using Node

This is an example of [nats](http://nats.io/) using [docker](https://www.docker.com/) and [node](https://nodejs.org/).

Once started, the app is running at [http://localhost:8000](http://localhost:8000).

## Running

    docker-compose build
    docker-compose up

## Scaling subscribers

    docker-compose scale subscriber=3
