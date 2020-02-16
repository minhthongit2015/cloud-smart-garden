import Post from '../../../../components/blog-base/post/Post';
import getContextOptions from './TrainedModelContextOptions';


export default class extends Post {
  get postType() {
    return this.props.type || 'TrainedModel';
  }

  get contextOptions() {
    return getContextOptions(this.post);
  }

  // render() {
  //   return this.post.title;
  // }
}
