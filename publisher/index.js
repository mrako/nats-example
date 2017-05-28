var NATS = require('nats');
var nats = NATS.connect();

nats.publish('foo', 'Hello World!');

nats.close();
