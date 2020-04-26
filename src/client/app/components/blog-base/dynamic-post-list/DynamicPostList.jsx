/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
import React from 'react';
import ShufflePostList from '../shuffle-post-list/ShufflePostList';
import DynamicList from '../../_base/DynamicList';
import SocialService from '../../../services/social/SocialService';


export default class extends DynamicList {
  get service() {
    return this.props.service || SocialService;
  }

  get model() {
    return this.props.model || this.service.model;
  }

  get postListProps() {
    const { items = [] } = this.state || {};
    return {
      posts: items,
      service: this.service,
      model: this.model,
      onContextActions: this.props.onContextActions
    };
  }

  constructor(props) {
    super(props);
    this.handleContextActions = this.handleContextActions.bind(this);
  }

  refresh() {
    this.fetchFromBeginning();
  }

  handleContextActions(event, option, post, postComponent) {
    const { parentPage } = this.props;

    if ((option.value === 'remove-saved-post' && parentPage === 'saved-posts')
      || (option.value === 'remove-i-do-post' && parentPage === 'i-will-do-this')) {
      this.setState(prevState => ({
        posts: prevState.posts.filter(p => p._id !== post._id)
      }));
    }
    if ((option.value === 'remove-saved-post-done' && parentPage === 'saved-posts')
      || (option.value === 'remove-i-do-post-done' && parentPage === 'i-will-do-this')) {
      this.fetchFromBeginning();
    }

    this.dispatchEvent(event, option, post, postComponent);
  }

  renderPostList() {
    return (
      <ShufflePostList
        {...this.postListProps}
      />
    );
  }

  render() {
    return this.renderPostList();
  }
}
