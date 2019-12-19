import React from 'react';
import NewPostRow from '../new-post/NewPostRow';
import UserService from '../../../services/user/UserService';


export default class extends React.Component {
  constructor(props) {
    super(props);
    this.postListRef = React.createRef();
    this.newPostRef = React.createRef();
    this.handlePostPosted = this.handlePostPosted.bind(this);
    this.handleActions = this.handleActions.bind(this);
    UserService.useUserState(this);
  }

  handlePostPosted() {
    if (this.postListRef.current.refresh) {
      this.postListRef.current.refresh();
    }
  }

  handleActions(event, option, post, postComponent) {
    if (option.value === 'update') {
      this.newPostRef.current.setPost(post, postComponent);
    }
    if (option.value === 'delete-done') {
      this.handlePostPosted();
    }
  }

  render() {
    const {
      categories, rootCategory, PostList, everyoneCanPost, ...restProps
    } = this.props;
    const canCreateNewPost = UserService.isAdmin || UserService.isModerator || everyoneCanPost;

    return (
      <React.Fragment>
        <NewPostRow
          ref={this.newPostRef}
          onPosted={this.handlePostPosted}
          rootCategory={rootCategory}
          categories={categories}
          hasPermission={canCreateNewPost}
        />
        <PostList
          {...restProps}
          ref={this.postListRef}
          category={(categories && categories[0]) || rootCategory}
          handleActions={this.handleActions}
          hasPermission={canCreateNewPost}
        />
      </React.Fragment>
    );
  }
}
