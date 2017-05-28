# NATS Example using Node

This is an example of [nats](http://nats.io/) using [docker](https://www.docker.com/) and [node](https://nodejs.org/).

## Running

    docker-compose build
    docker-compose up

## Scaling subscribers

    docker-compose scale subscriber=3

## Tag and Push

    docker tag natsexample_publisher mrako/nats-example-publisher && docker push mrako/nats-example-publisher
    docker tag natsexample_subscriber mrako/nats-example-subscriber && docker push mrako/nats-example-subscriber
