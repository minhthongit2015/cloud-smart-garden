/* eslint-disable class-methods-use-this */
import PostsModule from '../../../../components/blog-base/posts-module/PostsModule';
import NewExperimentPost from './NewExperimentPost';
import ExperimentPost from './ExperimentPost';


export default class extends PostsModule {
  get postType() {
    return 'Experiment';
  }

  get NewPostComponent() {
    return NewExperimentPost;
  }

  get PostComponent() {
    return ExperimentPost;
  }
}
