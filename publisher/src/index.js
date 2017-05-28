const Koa = require('koa');
const NATS = require('nats');

const port = process.env.PORT || 9000;

const app = new Koa();
const nats = NATS.connect('nats://nats:4222');

app.use(ctx => {
  if (ctx.request.url !== '/') ctx.throw(404);

  nats.publish('foo', 'Hello World!');
  ctx.body = 'Hello World!';
});

app.listen(port);

console.log('Publisher running on port ' + port);
