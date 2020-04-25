import BlogPostsModule from '../../../components/blog/blog-posts-module/BlogPostsModule';
import NewPlant from './NewPlant';
import PlantService from '../../../services/garden/PlantService';


export default class extends BlogPostsModule {
  // eslint-disable-next-line class-methods-use-this
  get model() {
    return PlantService.model;
  }

  get NewPostComponent() {
    return this.props.NewPostComponent || NewPlant;
  }
}
