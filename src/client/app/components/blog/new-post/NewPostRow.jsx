import React from 'react';
import { Row, Col } from 'mdbreact';
import NewPost from './NewPost';

export default React.forwardRef((props, ref) => (
  <Row>
    <Col size={12} className="d-flex justify-content-end">
      <NewPost ref={ref} {...props} />
    </Col>
  </Row>
));
