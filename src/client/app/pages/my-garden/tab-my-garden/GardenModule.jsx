import BlogPostsModule from '../../../components/blog/blog-posts-module/BlogPostsModule';
import NewGarden from './NewGarden';
import GardenService from '../../../services/garden/GardenService';


export default class extends BlogPostsModule {
  // eslint-disable-next-line class-methods-use-this
  get model() {
    return GardenService.model;
  }

  get NewPostComponent() {
    return this.props.NewPostComponent || NewGarden;
  }
}
