import React from 'react';
import { Row, Col } from 'mdbreact';
import PostList from '../../../../../components/blog-base/post-list/PostList';
import GardenStory from './GardenStory';
import './GardenStoryList.scss';


export default class extends PostList {
  // eslint-disable-next-line class-methods-use-this
  get PostComponent() {
    return GardenStory;
  }

  renderPostList() {
    const { posts = [] } = this.props;

    return (
      <Row className="garden-story-list py-3">
        <Col size="12" md="10" className="offset-md-1">
          <div>
            {posts && posts.map(post => this.renderPost(post))}
          </div>
        </Col>
      </Row>
    );
  }
}
