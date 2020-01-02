import BlogPostsModule from '../../../components/blog/blog-posts-module/BlogPostsModule';
import NewDataset from './NewDataset';


export default class extends BlogPostsModule {
  get postType() {
    return this.props.type || 'Dataset';
  }

  get NewPostComponent() {
    return this.props.NewPostComponent || NewDataset;
  }
}
