/* eslint-disable class-methods-use-this */
import React from 'react';
import PostList from '../../../../components/blog-base/post-list/PostList';
import TrainedModelPost from './TrainedModelPost';


export default class TrainedModelPostList extends PostList {
  get PostComponent() {
    return TrainedModelPost;
  }

  renderPostWithWrapper(post) {
    return (
      <div key={Math.random() + post._id} className="w-xl-7 w-lg-5 w-md-3 w-sm-3 w-2 mt-2 p-2">
        {this.renderPost(post)}
      </div>
    );
  }

  renderPostList() {
    const { posts } = this.props;
    return (
      <div className="d-flex flex-wrap">
        {posts && posts.map(post => this.renderPostWithWrapper(post))}
      </div>
    );
  }
}
