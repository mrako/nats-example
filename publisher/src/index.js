const http = require('http');
const Koa = require('koa');
const cors = require('kcors');

const NATS = require('nats');

const debug = require('debug')('publisher');

const port = process.env.PORT || 9000;

const app = new Koa();
const nats = NATS.connect('nats://nats:4222');

let hostsOnline = [];

app.use(cors({ credentials: true }));

const server = http.createServer(app.callback());
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  debug('a user connected');

  socket.on('disconnect', () => {
    debug('user disconnected');
  });

  socket.on('whoisonline', (request) => {
    debug('received whoisonline from webapp');
    hostsOnline = [];

    nats.request('whoisonline', (host) => {
      debug(`host ${host} replied to be online`);

      if (!hostsOnline.includes(host)) {
        hostsOnline.push(host);
      }

      socket.emit('online', hostsOnline);
    });
  });
});

nats.subscribe('online', (host) => {
  debug(`host online: ${host}`);
  if (!hostsOnline.includes(host)) {
    hostsOnline.push(host);
  }
  io.sockets.emit('online', hostsOnline);
});

nats.subscribe('offline', (host) => {
  debug(`host offline: ${host}`);
  let index = hostsOnline.indexOf(host);
  if (index >= 0) {
    hostsOnline.splice(index, 1);
  }
  io.sockets.emit('online', hostsOnline);
});

server.listen(port);

debug('Publisher running on port ' + port);
