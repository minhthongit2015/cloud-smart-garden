import Post from '../../blog-base/post/Post';
import getContextOptions from './BlogPostContextOptions';


export default class extends Post {
  get contextOptions() {
    return getContextOptions(this.post);
  }
}
