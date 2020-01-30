import Post from '../../../../components/blog-base/post/Post';
import getContextOptions from './ExperimentPostContextOptions';


export default class extends Post {
  get postType() {
    return this.props.type || 'Experiment';
  }

  get contextOptions() {
    return getContextOptions(this.post);
  }

  // render() {
  //   return this.post.title;
  // }
}
