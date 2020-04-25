/* eslint-disable class-methods-use-this */
import BaseComponent from './BaseComponent';


export default class extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items || []
    };
  }
}
