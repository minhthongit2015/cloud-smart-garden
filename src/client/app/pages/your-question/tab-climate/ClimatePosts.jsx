import EarthPicturePosts from '../tab-your-question/YourQuestionPosts';


export default class ClimatePosts extends EarthPicturePosts {
  constructor(props) {
    super(props);
    this.category = 'AskForClimate';
  }
}
