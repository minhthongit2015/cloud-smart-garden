import BlogPostsModule from '../../../components/blog/blog-posts-module/BlogPostsModule';
import NewGarden from './NewGarden';


export default class extends BlogPostsModule {
  get postType() {
    return this.props.type || 'Garden';
  }

  get NewPostComponent() {
    return this.props.NewPostComponent || NewGarden;
  }
}
