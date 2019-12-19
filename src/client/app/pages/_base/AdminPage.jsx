import BasePage from './BasePage';


export default class extends BasePage {
  constructor(props, title) {
    super(props, title, true);
    window.historyz = props.history || window.historyz;
  }
}
