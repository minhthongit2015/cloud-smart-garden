/**
 * This middle ware is base on https://github.com/hden/socketio-wildcard
 */

const BuiltInEmitter = require('events').EventEmitter;

const Emitter = BuiltInEmitter;
const { emit } = Emitter.prototype;

function onAnyEvent(packet) {
  const args = packet.data || [];
  if (packet.id != null) {
    args.push(this.ack(packet.id));
  }

  const supportedMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
  const method = supportedMethods.find(
    supportedMethod => args[0].toUpperCase().startsWith(supportedMethod)
  );
  let pathname = '';
  if (method) {
    pathname = args[0].slice(method.length + 1);
  } else {
    args[2]('Method not supported');
    return null;
  }
  // const clientAddress = this.conn.remoteAddress.split(':').slice(-1);
  // const clientPort = this.conn.request.client.remotePort;
  // const url = `http://${clientAddress}:${clientPort}/${pathname}`;
  const url = `/${pathname}`;
  args[1] = Object.assign({},
    {
      url,
      method,
      body: {
        ...args[1]
      }
    });
  emit.call(this, '*', packet);
  return emit.apply(this, args);
}


function RequestParser(socket, next) {
  if (socket.onevent !== onAnyEvent) {
    // eslint-disable-next-line no-param-reassign
    socket.onevent = onAnyEvent;
  }
  next();
}

module.exports = RequestParser;
