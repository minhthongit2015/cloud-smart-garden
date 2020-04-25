/* eslint-disable class-methods-use-this */
import PostsModule from '../../../../components/blog-base/posts-module/PostsModule';
import NewExperimentPost from './NewExperimentPost';
import ExperimentPost from './ExperimentPost';
import ExperimentService from '../../../../services/AI/ExperimentService';


export default class extends PostsModule {
  get model() {
    return ExperimentService.model;
  }

  get NewPostComponent() {
    return NewExperimentPost;
  }

  get PostComponent() {
    return ExperimentPost;
  }
}
