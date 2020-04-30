/* eslint-disable class-methods-use-this */
import PostsModule from '../../../../components/blog-base/posts-module/PostsModule';
import NewTrainedModel from './NewTrainedModel';
import TrainedModelPost from './TrainedModelPost';
import { ModelName } from '../../../../utils/Constants';
import TrainedModelPostList from './TrainedModelPostList';


export default class extends PostsModule {
  get model() {
    return ModelName.trainedModel;
  }

  get NewPostComponent() {
    return NewTrainedModel;
  }

  get InnerPostListComponent() {
    return TrainedModelPostList;
  }

  get PostComponent() {
    return TrainedModelPost;
  }
}
