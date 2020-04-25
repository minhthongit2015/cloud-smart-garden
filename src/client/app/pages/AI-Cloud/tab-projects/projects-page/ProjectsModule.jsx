/* eslint-disable class-methods-use-this */
import PostsModule from '../../../../components/blog-base/posts-module/PostsModule';
import NewProject from './NewProject';
import ProjectPost from './ProjectPost';


export default class extends PostsModule {
  get model() {
    return this.props.model || 'Project';
  }

  get NewPostComponent() {
    return NewProject;
  }

  get PostComponent() {
    return ProjectPost;
  }
}
