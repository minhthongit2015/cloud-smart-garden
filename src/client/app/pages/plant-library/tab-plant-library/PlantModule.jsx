import BlogPostsModule from '../../../components/blog/blog-posts-module/BlogPostsModule';
import NewPlant from './NewPlant';
import PlantService from '../../../services/garden/PlantService';


export default class extends BlogPostsModule {
  // eslint-disable-next-line class-methods-use-this
  get service() {
    return PlantService;
  }

  get NewPostComponent() {
    return this.props.NewPostComponent || NewPlant;
  }
}
