import React, { memo } from 'react';
import {
  Col, Row
} from 'mdbreact';
import Composer from '../../../../../components/utils/composer/Composer';
import DropUploader from '../../../../../components/utils/drop-uploader/DropUploader';


export default memo(() => (
  <Row className="pt-3">
    <Col size="12" sm="6" className="offset-sm-3">
      <div>
        <DropUploader />
      </div>
      <div className="mt-3">
        <Composer height="170px" />
      </div>
    </Col>
  </Row>
));
