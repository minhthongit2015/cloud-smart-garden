import BaseSound from './BaseSound';

export default class extends BaseSound {
  static tock() {
    this.play(this.TOCK);
  }

  static tock2() {
    this.play(this.SUBTLE, 0.2);
  }

  static future1() {
    this.play(this.FUTURE_1, 0.3);
  }

  static magic() {
    this.play(this.MAGIC, 0.5);
  }

  static paper() {
    this.play(this.PAPER);
  }
}
