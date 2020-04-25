import BlogPostsModule from '../../../components/blog/blog-posts-module/BlogPostsModule';
import NewDataset from './NewDataset';
import ApiEndpoints from '../../../utils/ApiEndpoints';
import DatasetService from '../../../services/AI/DatasetService';


export default class extends BlogPostsModule {
  // eslint-disable-next-line class-methods-use-this
  get service() {
    return DatasetService;
  }

  get model() {
    return this.service.model;
  }

  get NewPostComponent() {
    return this.props.NewPostComponent || NewDataset;
  }

  get postListProps() {
    return { ...super.postListProps, endPoint: ApiEndpoints.datasets };
  }
}
