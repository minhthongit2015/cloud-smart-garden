import BlogPostsModule from '../../../components/blog/blog-posts-module/BlogPostsModule';
import NewPlant from './NewPlant';


export default class extends BlogPostsModule {
  get postType() {
    return this.props.type || 'Plant';
  }

  get NewPostComponent() {
    return this.props.NewPostComponent || NewPlant;
  }
}
