/* eslint-disable class-methods-use-this */
import React from 'react';
import NewPost from './new-post/NewPost';
import InfinitePostList from './infinite-post-list/InfinitePostList';


export default class extends React.PureComponent {
  get NewPostComponent() {
    return NewPost;
  }

  get PostListComponent() {
    return InfinitePostList;
  }

  constructor(props) {
    super(props);
    this.newPostRef = React.createRef();
    this.postListRef = React.createRef();
    this.handlePostSubmit = this.handlePostSubmit.bind(this);
    this.handlePostSubmitted = this.handlePostSubmitted.bind(this);
    this.handleActions = this.handleActions.bind(this);
  }

  refreshPostList() {
    if (this.postListRef.current.refresh) {
      this.postListRef.current.refresh();
    }
  }

  handlePostSubmit() {
    return true;
  }

  handlePostSubmitted() {
    this.refreshPostList();
  }

  handleActions(event, option, post, postComponent) {
    if (option.value === 'update') {
      this.newPostRef.current.setPost(post, postComponent);
    }
    if (option.value === 'delete-done') {
      this.refreshPostList();
    }
  }

  render() {
    const {
      NewPostComponent = this.NewPostComponent, PostListComponent = this.PostListComponent,
      endpoint, categories, everyoneCanPost,
      newPostProps = {}, postListProps = {}
    } = this.props;

    return (
      <React.Fragment>
        <NewPostComponent
          {...newPostProps}
          ref={this.newPostRef}
          onSubmit={this.handlePostSubmit}
          onSubmitted={this.handlePostSubmitted}
          categories={categories}
          hasPermission={everyoneCanPost}
          endpoint={endpoint}
        />
        <PostListComponent
          {...postListProps}
          ref={this.postListRef}
          categories={categories}
          handleActions={this.handleActions}
          hasPermission={everyoneCanPost}
          endpoint={endpoint}
        />
      </React.Fragment>
    );
  }
}
