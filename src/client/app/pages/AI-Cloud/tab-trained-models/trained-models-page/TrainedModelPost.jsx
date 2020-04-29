/* eslint-disable class-methods-use-this */
import Post from '../../../../components/blog-base/post/Post';
import getContextOptions from './TrainedModelContextOptions';
import { ModelName } from '../../../../utils/Constants';


export default class extends Post {
  get model() {
    return ModelName.trainedModel;
  }

  get contextOptions() {
    return getContextOptions(this.post);
  }
}
