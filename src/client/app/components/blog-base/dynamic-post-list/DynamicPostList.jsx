/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
import React from 'react';
import ShufflePostList from '../shuffle-post-list/ShufflePostList';
import DynamicList from '../../_base/list/DynamicList';
import SocialService from '../../../services/social/SocialService';


export default class extends DynamicList {
  get service() {
    return this.props.service || SocialService;
  }

  get model() {
    return this.props.model || this.service.model;
  }

  get PostListComponent() {
    return this.props.PostListComponent || ShufflePostList;
  }

  get postListProps() {
    const { items = [] } = this.state || {};
    return {
      ref: this.postListRef,
      posts: items,
      service: this.service,
      model: this.model,
      PostComponent: this.props.PostComponent,
      onContextActions: this.props.onContextActions,
      hasPermission: this.props.hasPermission
    };
  }

  constructor(props) {
    super(props);
    this.postListRef = React.createRef();
    this.handleContextActions = this.handleContextActions.bind(this);
  }

  refresh() {
    this.fetchFromBeginning()
      .then(() => {
        this.postListRef.current.forceUpdate();
      });
  }

  sortItems(posts) {
    const resolvedPosts = super.resolveFetchedData(posts) || [];
    return resolvedPosts.sort((postA, postB) => postB.createdAt - postA.createdAt);
  }

  handleContextActions(event, option, post, postComponent) {
    const { parentPage } = this.props;

    if ((option.value === 'remove-saved-post' && parentPage === 'saved-posts')) {
      this.setState(prevState => ({
        posts: prevState.posts.filter(p => p._id !== post._id)
      }));
    }
    if ((option.value === 'remove-saved-post-done' && parentPage === 'saved-posts')) {
      this.fetchFromBeginning();
    }

    this.dispatchEvent(event, option, post, postComponent);
  }

  renderPostList() {
    const { PostListComponent } = this;
    return (
      <PostListComponent
        {...this.postListProps}
      />
    );
  }

  render() {
    return this.renderPostList();
  }
}
