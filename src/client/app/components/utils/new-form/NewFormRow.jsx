import React from 'react';
import { Row, Col } from 'mdbreact';
import NewForm from './NewForm';

export default React.forwardRef((props, ref) => (
  <Row>
    <Col size={12} className="d-flex justify-content-end">
      <NewForm ref={ref} {...props} />
    </Col>
  </Row>
));
