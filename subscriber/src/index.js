const Koa = require('koa');
const NATS = require('nats');

var debug = require('debug')('subscriber');

const port = process.env.PORT || 9000;
const hostname = process.env.HOSTNAME;

const app = new Koa();
const nats = NATS.connect('nats://nats:4222');

nats.subscribe('whoisonline', (request, replyTo) => {
  debug(`subscriber received whoisonline`);
  nats.publish(replyTo, hostname);
});

nats.publish('online', hostname);

app.listen(port);

const unsubscribe = (nats) => {
  debug('unsubscribing: ' + hostname);

  nats.publish('offline', hostname, () => {
    nats.close();
    process.exit(1);
  });
};

process.on('SIGTERM', () => unsubscribe(nats));

debug(`subscriber ${hostname} running`);
