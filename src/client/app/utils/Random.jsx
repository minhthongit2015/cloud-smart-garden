
import * as random from 'random-js';

const engine = random.nativeMath;

export default class {
  static hex(length = 8, upercase = false) {
    return random.hex(upercase)(engine, length);
  }

  static int(min, max) {
    return random.integer(min, max)(engine);
  }

  static random(array) {
    if (!array || array.length <= 0) {
      return null;
    }
    return array[this.int(0, array.length - 1)];
  }
}
