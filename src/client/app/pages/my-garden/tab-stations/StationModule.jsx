import BlogPostsModule from '../../../components/blog/blog-posts-module/BlogPostsModule';
import NewStation from './NewStation';
import StationService from '../../../services/garden/StationService';


export default class extends BlogPostsModule {
  // eslint-disable-next-line class-methods-use-this
  get service() {
    return StationService;
  }

  get NewPostComponent() {
    return this.props.NewPostComponent || NewStation;
  }
}
