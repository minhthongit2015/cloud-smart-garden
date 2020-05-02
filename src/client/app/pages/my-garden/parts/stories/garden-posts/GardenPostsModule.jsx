/* eslint-disable class-methods-use-this */
import React from 'react';
import { Row, Col } from 'mdbreact';
import GardenStoryService from '../../../../../services/garden/GardenStoryService';
import GardenStoryList from './GardenStoryList';
import PostsModule from '../../../../../components/blog-base/posts-module/PostsModule';
import NewStory from './NewStory';
import GardenStory from './GardenStory';


export default class extends PostsModule {
  get service() {
    return GardenStoryService;
  }

  get NewPostComponent() {
    return NewStory;
  }

  get InnerPostListComponent() {
    return GardenStoryList;
  }

  get PostComponent() {
    return GardenStory;
  }

  render() {
    const { NewPostComponent, PostListComponent } = this;
    return (
      <>
        {this.showCreatePost && (
          <Row className="py-3">
            <Col size="12" sm="8" className="offset-sm-2">
              <NewPostComponent {...this.newPostProps} />
            </Col>
          </Row>
        )}
        {this.showPostList && (
          <PostListComponent {...this.postListProps} />
        )}
      </>
    );
  }
}
