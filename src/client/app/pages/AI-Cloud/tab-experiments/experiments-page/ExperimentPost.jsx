import Post from '../../../../components/blog-base/post/Post';
import getContextOptions from './ExperimentPostContextOptions';

export default class extends Post {
  get postType() {
    return this.props.type || 'Experiment';
  }

  get contextOptions() {
    return getContextOptions(this.post);
  }

  handlePostClick(event) {
    // open popup
    super.handlePostClick(event);
    this.dispatchEvent(event);
  }

  // render() {
  //   return this.post.title;
  // }
}
