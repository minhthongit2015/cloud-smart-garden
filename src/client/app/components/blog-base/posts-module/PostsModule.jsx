import React from 'react';
import NewPost from '../new-post/NewPost';
import UserService from '../../../services/user/UserService';
import InfinitePostList from '../infinite-post-list/InfinitePostList';
import ContextOptions from '../ContextOptions';


export default class extends React.Component {
  get postType() {
    return this.props.type || 'Post';
  }

  get NewPostComponent() {
    return this.props.NewPostComponent || NewPost;
  }

  get PostListComponent() {
    return this.props.PostListComponent || InfinitePostList;
  }

  get newPostProps() {
    const { type = this.postType, categories, everyoneCanPost } = this.props;
    const canCreateNewPost = UserService.isAdmin || UserService.isModerator || everyoneCanPost;

    return {
      ref: this.newPostRef,
      type,
      categories,
      hasPermission: canCreateNewPost,
      onPostPosted: this.handlePostPosted
    };
  }

  get postListProps() {
    const {
      type = this.postType, categories, everyoneCanPost, ...restProps
    } = this.props;
    const canCreateNewPost = UserService.isAdmin || UserService.isModerator || everyoneCanPost;

    return {
      ...restProps,
      ref: this.postListRef,
      type,
      categories,
      hasPermission: canCreateNewPost,
      onContextActions: this.handleContextActions
    };
  }

  constructor(props) {
    super(props);
    this.newPostRef = React.createRef();
    this.postListRef = React.createRef();
    this.handlePostPosted = this.handlePostPosted.bind(this);
    this.handleContextActions = this.handleContextActions.bind(this);
    UserService.useUserState(this);
  }

  handlePostPosted() {
    this.refreshPostList();
  }

  handleContextActions(event, option, post, postComponent) {
    if (option.value === ContextOptions.update.value) {
      this.setPost(post, postComponent);
    }
    if (option.value === ContextOptions.deleteDone.value) {
      this.refreshPostList();
    }
  }

  setPost(post, postComponent) {
    this.newPostRef.current.setPost(post, postComponent);
  }

  refreshPostList() {
    if (this.postListRef.current.refresh) {
      this.postListRef.current.refresh();
    }
  }

  render() {
    const { NewPostComponent, PostListComponent } = this;

    return (
      <React.Fragment>
        <NewPostComponent {...this.newPostProps} />
        <PostListComponent {...this.postListProps} />
      </React.Fragment>
    );
  }
}
