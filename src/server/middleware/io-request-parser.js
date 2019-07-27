

const BuiltInEmitter = require('events').EventEmitter;

const Emitter = BuiltInEmitter;
const { emit } = Emitter.prototype;

function onAnyEvent(packet) {
  const args = packet.data || [];
  if (packet.id != null) {
    args.push(this.ack(packet.id));
  }
  const url = new URL(`http://localhost/${args[0]}`);
  const searchParams = {};
  url.searchParams.forEach((value, name) => { searchParams[name] = value; });
  args[1] = Object.assign({},
    {
      // params: {},
      query: searchParams,
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
