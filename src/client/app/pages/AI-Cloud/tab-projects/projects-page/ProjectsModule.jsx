/* eslint-disable class-methods-use-this */
import PostsModule from '../../../../components/blog-base/posts-module/PostsModule';
import NewProject from './NewProject';
import ProjectPost from './ProjectPost';


export default class extends PostsModule {
  get postType() {
    return this.props.type || 'Project';
  }

  get NewPostComponent() {
    return NewProject;
  }

  get PostComponent() {
    return ProjectPost;
  }
}
