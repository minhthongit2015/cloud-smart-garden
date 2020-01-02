import PostsModule from '../../blog-base/posts-module/PostsModule';
import NewBlogPost from '../new-blog-post/NewBlogPost';
import InfiniteBlogPostList from '../infinite-blog-post-list/InfiniteBlogPostList';


export default class extends PostsModule {
  get postType() {
    return this.props.type || 'BlogPost';
  }

  get NewPostComponent() {
    return this.props.NewPostComponent || NewBlogPost;
  }

  get PostListComponent() {
    return this.props.PostListComponent || InfiniteBlogPostList;
  }
}
