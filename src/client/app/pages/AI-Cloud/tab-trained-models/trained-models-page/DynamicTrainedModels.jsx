/* eslint-disable class-methods-use-this */
import InfinitePostList from '../../../../components/blog-base/infinite-post-list/InfinitePostList';
import TrainedModelPostList from './TrainedModelPostList';
import ModelService from '../../../../services/AI/ModelService';


export default class extends InfinitePostList {
  get service() {
    return ModelService;
  }

  get PostListComponent() {
    return TrainedModelPostList;
  }
}
