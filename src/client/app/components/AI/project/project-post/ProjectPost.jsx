import Post from '../../../blog-base/post/Post';
import getContextOptions from './ProjectPostContextOptions';


export default class extends Post {
  get postType() {
    return this.props.type || 'BlogPost';
  }

  get contextOptions() {
    return getContextOptions(this.post);
  }

  // render() {
  //   return this.post.title;
  // }
}
