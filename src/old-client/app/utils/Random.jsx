
import * as random from 'random-js';

const engine = random.nativeMath;

function hex(length = 8, upercase = false) {
  return random.hex(upercase)(engine, length);
}

export default {
  hex
};
