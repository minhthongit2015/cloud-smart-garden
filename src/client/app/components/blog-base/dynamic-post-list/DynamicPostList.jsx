/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
import React from 'react';
import superrequest from '../../../utils/superrequest';
import ShufflePostList from '../shuffle-post-list/ShufflePostList';
import ApiEndpoints from '../../../utils/ApiEndpoints';
import BaseComponent from '../../_base/BaseComponent';


export default class extends BaseComponent.Pure {
  get postEndpoint() {
    return ApiEndpoints.posts;
  }

  get scrollableTarget() {
    return 'sidebar-layout__content';
  }

  get restProps() {
    const { posts } = this.state;
    const { posts: postsz, ...restProps } = this.props;
    return { posts, ...restProps };
  }

  get postType() {
    return this.props.type || 'Post';
  }

  constructor(props) {
    super(props);
    this.fetchPosts = this.fetchPosts.bind(this);
    this.handleContextActions = this.handleContextActions.bind(this);
    this.page = 0;
    this.state = {
      posts: [],
      hasMore: true
    };
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
      this.refresh();
    }

    this.dispatchEvent(event, option, post, postComponent);
  }

  componentDidMount() {
    this.page = 0;
    this.fetchAllPosts();
  }

  componentWillUnmount() {
    clearTimeout(this.fetchTimeout);
  }

  refresh() {
    this.fetchAllPosts();
  }

  async fetchAllPosts() {
    const { categories = [], postsPerPage = 4, endPoint: overrideEndpoint } = this.props;
    const limit = (this.page + 1) * postsPerPage;
    const offset = 0;

    let endPoint = overrideEndpoint
      || ApiEndpoints.params(this.postEndpoint, { categories: JSON.stringify(categories) });
    endPoint = ApiEndpoints.builder(endPoint).limit(limit).offset(offset).__t(this.postType);

    const mappingRes = this.props.mappingRes || (res => res);

    return superrequest.get(endPoint.toString())
      .then(mappingRes)
      .then((res) => {
        this.setState({
          posts: []
        }, () => {
          this.resolvePosts(res, this.page, offset, limit);
        });
      });
  }

  async fetchPosts() {
    const { categories, postsPerPage = 4, endPoint: overrideEndpoint } = this.props;
    const limit = postsPerPage;
    const offset = this.page * limit;

    let endPoint = overrideEndpoint
      || ApiEndpoints.params(this.postEndpoint, { categories: JSON.stringify(categories) });
    endPoint = ApiEndpoints.builder(endPoint).limit(limit).offset(offset).__t(this.postType);

    const mappingRes = this.props.mappingRes || (res => res);

    return superrequest.get(endPoint.toString())
      .then(mappingRes)
      .then((res) => {
        if (!res || !res.ok) {
          // If it has some error, then try to fetch again after 2s
          this.fetchTimeout = setTimeout(() => {
            this.fetchPosts();
          }, 2000);
          return;
        }
        this.resolvePosts(res, this.page, offset, limit);
      });
  }

  resolvePosts(res, page, offset, limit) {
    const isStillHasMore = res.data.length >= limit;
    if (isStillHasMore) {
      this.page++;
    }
    if (res.data.length > 0) {
      const newPosts = res.data.filter(post => this.state.posts.every(p => p._id !== post._id));
      this.setState(prevState => ({
        posts: prevState.posts.concat(newPosts),
        hasMore: isStillHasMore
      }));
    } else {
      this.setState({
        hasMore: isStillHasMore
      });
    }
  }

  renderPostList() {
    return (
      <ShufflePostList
        {...this.restProps}
      />
    );
  }

  render() {
    return this.renderPostList();
  }
}
