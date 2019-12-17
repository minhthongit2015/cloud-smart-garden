import YourQuestionPosts from '../tab-your-question/YourQuestionPosts';


export default class ClimatePosts extends YourQuestionPosts {
  constructor(props) {
    super(props);
    this.category = 'AskForOrganisms';
  }
}
