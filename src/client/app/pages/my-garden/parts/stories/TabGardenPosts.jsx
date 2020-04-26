
import React, { memo } from 'react';
import { Row, Col } from 'mdbreact';
import GardenStoryList from './garden-posts/GardenStoryList';
import NewStoryLegacy from './garden-posts/new-story/NewStoryLegacy';


export default memo(({ user }) => (
  <div>
    <Row className="py-3">
      <Col size="12" sm="8" className="offset-sm-2">
        <NewStoryLegacy user={user} hasPermission />
      </Col>
    </Row>
    <GardenStoryList user={user} />
  </div>
));
