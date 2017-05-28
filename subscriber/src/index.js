const Koa = require('koa');
const NATS = require('nats');

const port = process.env.PORT || 9000;
const hostname = process.env.HOSTNAME;

const app = new Koa();
const nats = NATS.connect('nats://nats:4222');

nats.subscribe('ping', function(request, replyTo) {
  console.log(`subscriber received message: ${request}`);
  nats.publish(replyTo, hostname);
});

nats.publish('online', hostname);

app.listen(port);

console.log(`subscriber running`);
