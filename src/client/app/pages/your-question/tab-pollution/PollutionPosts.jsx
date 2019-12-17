import YourQuestionPosts from '../tab-your-question/YourQuestionPosts';


export default class PollutionPosts extends YourQuestionPosts {
  constructor(props) {
    super(props);
    this.category = 'AskForPollution';
  }
}
