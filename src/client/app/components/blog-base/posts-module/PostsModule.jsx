/* eslint-disable class-methods-use-this */
import React from 'react';
import NewPost from '../new-post/NewPost';
import UserService from '../../../services/user/UserService';
import InfinitePostList from '../infinite-post-list/InfinitePostList';
import ContextOptions from '../ContextOptions';
import Post from '../post/Post';
import SocialService from '../../../services/social/SocialService';
import ShufflePostList from '../shuffle-post-list/ShufflePostList';


export default class extends React.Component {
  get service() {
    return this.props.service || SocialService;
  }

  get model() {
    return this.service.model;
  }

  get NewPostComponent() {
    return this.props.NewPostComponent || NewPost;
  }

  get newPost() {
    return this.newPostRef.current;
  }

  get PostListComponent() {
    return this.props.PostListComponent || InfinitePostList;
  }

  get InnerPostListComponent() {
    return this.props.InnerPostListComponent || ShufflePostList;
  }

  get postList() {
    return this.postListRef.current;
  }

  get PostComponent() {
    return this.props.PostComponent || Post;
  }

  get newPostProps() {
    const { categories, everyoneCanPost } = this.props;
    const canCreateNewPost = UserService.isAdmin || UserService.isModerator || everyoneCanPost;

    return {
      ref: this.newPostRef,
      service: this.service,
      model: this.model,
      categories,
      hasPermission: canCreateNewPost,
      onSubmited: this.handlePostPosted
    };
  }

  get postListProps() {
    const { everyoneCanPost } = this.props;
    const canCreateNewPost = UserService.isAdmin || UserService.isModerator || everyoneCanPost;

    return {
      ref: this.postListRef,
      service: this.service,
      model: this.model,
      PostListComponent: this.InnerPostListComponent,
      PostComponent: this.PostComponent,
      hasPermission: canCreateNewPost,
      onContextActions: this.handleContextActions
    };
  }

  get showCreatePost() {
    return this.props.showCreatePost != null ? this.props.showCreatePost : true;
  }

  get showPostList() {
    return this.props.showPostList != null ? this.props.showPostList : true;
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
    if (option.value === ContextOptions.deleted.value) {
      this.refreshPostList();
    }
  }

  setPost(post, postComponent) {
    if (this.newPost && this.newPost.setPost) {
      this.newPost.setPost(post, postComponent);
    }
  }

  refreshPostList() {
    if (this.postList && this.postList.refresh) {
      this.postList.refresh();
    }
  }

  render() {
    const { NewPostComponent, PostListComponent } = this;

    return (
      <React.Fragment>
        {this.showCreatePost && (
          <NewPostComponent {...this.newPostProps} />
        )}
        {this.showPostList && (
          <PostListComponent {...this.postListProps} />
        )}
      </React.Fragment>
    );
  }
}
