/* eslint-disable import/no-cycle */
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import RandomItem from 'random-item';
import LeafLoading from '../../utils/loadings/LeafLoading';
import t from '../../../languages';
import DynamicPostList from '../dynamic-post-list/DynamicPostList';


export default class InfinitePostList extends DynamicPostList {
  get postListProps() {
    const { scrollableTarget, endMessage, ...restProps } = super.postListProps;
    return restProps;
  }

  renderLoading() {
    const { loadingText = t('components.blog.infinitePostList.loadingText') } = this.props;
    return (
      <div className="overlapable mt-5" style={{ width: '100%', height: '200px' }}>
        <LeafLoading text={loadingText} overlaping />
      </div>
    );
  }

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
    const isNoPost = !this.state.items || this.state.items.length === 0;
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
    const { items } = this.state;
    const { scrollableTarget = 'sidebar-layout__content' } = this.props;

    return (
      <InfiniteScroll
        dataLength={items.length}
        next={this.next}
        scrollThreshold="200px"
        scrollableTarget={scrollableTarget}
        style={{ overflowX: 'hidden' }}
        hasMore={this.state.hasMore}
        loader={this.renderLoading()}
        endMessage={this.renderEnd()}
      >
        {this.renderPostList()}
      </InfiniteScroll>
    );
  }
}
