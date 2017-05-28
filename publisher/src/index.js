const http = require('http');
const Koa = require('koa');
const cors = require('kcors');

const NATS = require('nats');

const port = process.env.PORT || 9000;

const app = new Koa();
const nats = NATS.connect('nats://nats:4222');

let hostsOnline = [];

app.use(cors({ credentials: true }));
/*
app.use(async (ctx, next) => {
  if (ctx.request.url !== '/') {
    await next;
  } else {
    ctx.body = 'Hello World!';
  }
});
*/


const server = http.createServer(app.callback());
const io = require('socket.io')(server);

io.on('connection', (socket) => {  
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('whoisonline', (request) => {
    console.log('received whoisonline from webapp');
    hostsOnline = [];

    var sid = nats.request('whoisonline', (host) => {
      console.log(`host ${host} replied to be online`);

      if (!hostsOnline.includes(host)) {
        hostsOnline.push(host);
      }

      socket.emit('online', hostsOnline);
    });
  });
});

nats.subscribe('online', (host) => {
  console.log(`host online: ${host}`);
  if (!hostsOnline.includes(host)) {
    hostsOnline.push(host);
  }
  io.sockets.emit('online', hostsOnline);
});

nats.subscribe('offline', (host) => {
  console.log(`host offline: ${host}`);
  let index = hostsOnline.indexOf(host);
  if (index >= 0) {
    hostsOnline.splice(index, 1);
  }
  io.sockets.emit('online', hostsOnline);
});

server.listen(port);

console.log('Publisher running on port ' + port);
