import Sounds from './Sounds';

export default class extends Sounds {
  static hover() {
    this.tock2();
  }

  static select() {
    this.future1();
  }

  static open() {
    this.magic();
  }

  static tabChange() {
    this.paper();
  }
}
