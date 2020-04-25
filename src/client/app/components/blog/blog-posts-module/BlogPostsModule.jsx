import PostsModule from '../../blog-base/posts-module/PostsModule';
import NewBlogPost from '../new-blog-post/NewBlogPost';
import InfiniteBlogPostList from '../infinite-blog-post-list/InfiniteBlogPostList';
import PostService from '../../../services/blog/PostService';


export default class extends PostsModule {
  // eslint-disable-next-line class-methods-use-this
  get service() {
    return PostService;
  }

  get model() {
    return this.service.model;
  }

  get NewPostComponent() {
    return this.props.NewPostComponent || NewBlogPost;
  }

  get PostListComponent() {
    return this.props.PostListComponent || InfiniteBlogPostList;
  }
}
