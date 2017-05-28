const Koa = require('koa');
const NATS = require('nats');

const port = process.env.PORT || 9000;

const app = new Koa();
const nats = NATS.connect('nats://nats:4222');

nats.subscribe('foo', function(msg) {
  console.log(`subscriber received message: ${msg}`);
});

app.listen(port);

console.log(`subscriber running`);
