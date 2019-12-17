import BasePage from './BasePage';


export default class extends BasePage {
  constructor(...args) {
    super(...args);
    window.historyz = args[0].history || window.historyz;
  }
}
