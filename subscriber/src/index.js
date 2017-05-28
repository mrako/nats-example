const Koa = require('koa');
const NATS = require('nats');

var nodeCleanup = require('node-cleanup');

const port = process.env.PORT || 9000;
const hostname = process.env.HOSTNAME;

const app = new Koa();
const nats = NATS.connect('nats://nats:4222');

nats.subscribe('whoisonline', function(request, replyTo) {
  console.log(`subscriber received whoisonline`);
  nats.publish(replyTo, hostname);
});

nats.publish('online', hostname);

app.listen(port);

const unsubscribe = (nats) => {
  console.log('unsubscribing: ' + hostname);

  nats.publish('offline', hostname, () => {
    nats.close();
    process.exit(1);
  });
}

process.on('SIGTERM', () => { unsubscribe(nats) });

console.log(`subscriber ${hostname} running`);
