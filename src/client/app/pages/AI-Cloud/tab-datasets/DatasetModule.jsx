import BlogPostsModule from '../../../components/blog/blog-posts-module/BlogPostsModule';
import NewDataset from './NewDataset';
import ApiEndpoints from '../../../utils/ApiEndpoints';


export default class extends BlogPostsModule {
  get postType() {
    return this.props.type || 'Dataset';
  }

  get NewPostComponent() {
    return this.props.NewPostComponent || NewDataset;
  }

  get postListProps() {
    return { ...super.postListProps, endPoint: ApiEndpoints.datasets };
  }
}
