/* eslint-disable class-methods-use-this */
import PostsModule from '../../../../components/blog-base/posts-module/PostsModule';
import NewTrainedModel from './NewTrainedModel';
import TrainedModelPost from './TrainedModelPost';


export default class extends PostsModule {
  get postType() {
    return 'TrainedModel';
  }

  get NewPostComponent() {
    return NewTrainedModel;
  }

  get PostComponent() {
    return TrainedModelPost;
  }
}
