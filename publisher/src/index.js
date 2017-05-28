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
    console.log('received ping from client');
    socket.emit('online', hostsOnline);
    /*
    var sid = nats.request('ping', (response) => {
      console.log(`Got response: ${response}`);
      socket.emit('ping', response);
    });
    */
  });
});

nats.subscribe('online', (host) => {
  console.log(`host online: ${host}`);
  if (!hostsOnline.includes(host)) {
    hostsOnline.push(host);
    console.log(hostsOnline);
  }
  io.sockets.emit('online', hostsOnline);
});

server.listen(port);

console.log('Publisher running on port ' + port);
