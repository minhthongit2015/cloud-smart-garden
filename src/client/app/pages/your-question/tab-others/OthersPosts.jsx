import YourQuestionPosts from '../tab-your-question/YourQuestionPosts';


export default class extends YourQuestionPosts {
  constructor(props) {
    super(props);
    this.category = 'AskForOthers';
  }
}
