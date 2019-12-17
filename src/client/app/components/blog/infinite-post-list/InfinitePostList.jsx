import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import RandomItem from 'random-item';
import LeafLoading from '../../utils/loadings/LeafLoading';
// eslint-disable-next-line import/no-cycle
import PostList from '../post-list/PostList';
import superrequest from '../../../utils/superrequest';
import t from '../../../languages';

export default class InfinitePostList extends React.Component {
  constructor(props) {
    super(props);
    this.fetchPosts = this.fetchPosts.bind(this);
    this.handleActions = this.handleActions.bind(this);
    this.page = 0;
    this.state = {
      posts: [],
      hasMore: true
    };
  }

  handleActions(event, option, post, postComponent) {
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

    if (this.props.handleActions) {
      this.props.handleActions(event, option, post, postComponent);
    }
  }

  componentDidMount() {
    this._ismounted = true;
    this.page = 0;
    this.fetchAllPosts();
  }

  componentWillUnmount() {
    this._ismounted = false;
  }

  refresh() {
    this.fetchAllPosts();
  }

  async fetchAllPosts() {
    const { category, postsPerPage = 4 } = this.props;
    const limit = (this.page + 1) * postsPerPage;
    const offset = 0;

    let endPoint = this.props.endPoint || `/api/v1/blog/posts?category=${category}`;
    endPoint = `${endPoint}${endPoint.includes('?') ? '&' : '?'}limit=${limit}&offset=${offset}`;

    const mappingRes = this.props.mappingRes || (res => res);

    return superrequest.get(endPoint)
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
    const { category, postsPerPage = 4 } = this.props;
    const limit = postsPerPage;
    const offset = this.page * limit;

    let endPoint = this.props.endPoint || `/api/v1/blog/posts?category=${category}`;
    endPoint = `${endPoint}${endPoint.includes('?') ? '&' : '?'}limit=${limit}&offset=${offset}`;

    const mappingRes = this.props.mappingRes || (res => res);

    return superrequest.get(endPoint)
      .then(mappingRes)
      .then((res) => {
        if (!res || !res.ok) {
          // If it has some error, then try to fetch again after 2s
          if (this._ismounted) {
            setTimeout(() => {
              this.fetchPosts();
            }, 2000);
          }
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

  renderLoading() {
    const { loadingText = t('components.blog.infinitePostList.loadingText') } = this.props;
    return (
      <div className="overlapable mt-5" style={{ width: '100%', height: '200px' }}>
        <LeafLoading text={loadingText} overlaping />
      </div>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  getRandomEndMessage() {
    if (this.props.endMessage != null) {
      return this.props.endMessage;
    }
    return RandomItem([
      t('components.blog.infinitePostList.knowAllMsg'),
      t('components.blog.infinitePostList.knowAllMsg1'),
      t('components.blog.infinitePostList.knowAllMsg2'),
      t('components.blog.infinitePostList.knowAllMsg3'),
      t('components.blog.infinitePostList.knowAllMsg4'),
      t('components.blog.infinitePostList.knowAllMsg5'),
      t('components.blog.infinitePostList.knowAllMsg6'),
      t('components.blog.infinitePostList.knowAllMsg7')
    ]);
  }

  renderEnd() {
    const knowAllMsg = this.getRandomEndMessage();
    const noPostMsg = this.props.noPostMsg || t('components.blog.infinitePostList.noPostMsg');
    const isNoPost = this.state.posts.length === 0;
    const message = isNoPost
      ? noPostMsg
      : knowAllMsg;
    return (
      <React.Fragment>
        {message ? (
          <div className="text-center">
            <hr className="w-75 mt-5" />
            <div className="my-5 text-monospace text-black-50 font-weight-bold">
              {message}
            </div>
          </div>
        ) : (
          <div className="mt-3" />
        )}
      </React.Fragment>
    );
  }

  render() {
    const { posts } = this.state;
    const { scrollableTarget = 'sidebar-layout__content', ...restProps } = this.props;

    return (
      <InfiniteScroll
        dataLength={posts.length}
        next={this.fetchPosts}
        scrollThreshold="200px"
        scrollableTarget={scrollableTarget}
        style={{ overflowX: 'hidden' }}
        hasMore={this.state.hasMore}
        loader={this.renderLoading()}
        endMessage={this.renderEnd()}
      >
        <PostList posts={posts} handleActions={this.handleActions} {...restProps} />
      </InfiniteScroll>
    );
  }
}
