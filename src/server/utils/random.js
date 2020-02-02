
const random = require('random-js');
const uuid = require('uuid');

const engine = random.nativeMath;

module.exports = class {
  static hex(length = 8, upercase = false) {
    return random.hex(upercase)(engine, length);
  }

  /**
   * @param {1 | 4} version
   */
  static uuid(version = 1 || 4) {
    const versions = {
      1: uuid.v1.bind(uuid),
      4: uuid.v4.bind(uuid)
    };
    return versions[version]();
  }

  static int(min, max) {
    return random.integer(min, max)(engine);
  }

  static float(min, max) {
    return random.real(min, max)(engine);
  }

  static bool() {
    return random.bool()(engine);
  }

  static random(array) {
    if (!array || array.length <= 0) {
      return null;
    }
    return array[this.int(0, array.length - 1)];
  }
};
