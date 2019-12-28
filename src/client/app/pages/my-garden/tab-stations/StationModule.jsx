import BlogPostsModule from '../../../components/blog/blog-posts-module/BlogPostsModule';
import NewStation from './NewStation';


export default class extends BlogPostsModule {
  get postType() {
    return this.props.type || 'Station';
  }

  get NewPostComponent() {
    return this.props.NewPostComponent || NewStation;
  }
}
