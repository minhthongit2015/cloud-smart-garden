/* eslint-disable class-methods-use-this */
import PostsModule from '../../../../components/blog-base/posts-module/PostsModule';
import NewTrainedModel from './NewTrainedModel';
import TrainedModelPost from './TrainedModelPost';
import { ModelName } from '../../../../utils/Constants';


export default class extends PostsModule {
  get model() {
    return this.props.model || ModelName.trainedModel;
  }

  get NewPostComponent() {
    return NewTrainedModel;
  }

  get PostComponent() {
    return TrainedModelPost;
  }
}
