import React from 'react';
import { Row, Col } from 'mdbreact';
import NewQuote from './NewQuote';

export default React.forwardRef((props, ref) => (
  <Row>
    <Col size={12} className="d-flex justify-content-end">
      <NewQuote ref={ref} {...props} />
    </Col>
  </Row>
));
