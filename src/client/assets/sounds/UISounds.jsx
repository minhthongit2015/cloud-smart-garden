import Sound from '.';

export default class extends Sound {
  static playTock() {
    this.play(this.TOCK);
  }

  static playTock2() {
    this.play(this.SUBTLE, 0.2);
  }

  static playFuture1() {
    this.play(this.FUTURE_1, 0.3);
  }

  static playMagic() {
    this.play(this.MAGIC, 0.5);
  }

  static playTabChange() {
    this.play(this.PAPER);
  }
}
