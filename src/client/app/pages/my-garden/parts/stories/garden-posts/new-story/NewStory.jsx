import React from 'react';
import { Col, Row } from 'mdbreact';
import Composer from '../../../../../../components/form/inputs/composer/Composer';
import DropUploader from '../../../../../../components/form/inputs/drop-uploader/DropUploader';
import BaseComponent from '../../../../../../components/_base/BaseComponent';


export default class extends BaseComponent.Pure {
  constructor(props) {
    super(props);
    this.state = {
      photo: ''
    };
  }

  render() {
    const { photo } = this.state;

    return (
      <Row className="pt-3">
        <Col size="12" sm="6" className="offset-sm-3">
          <div>
            <DropUploader
              name="photo"
              value={photo}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="mt-3">
            <Composer height="170px" />
          </div>
        </Col>
      </Row>
    );
  }
}
