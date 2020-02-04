import React from 'react';
import { MDBTable } from 'mdbreact';
import BaseComponent from '../../../../../components/BaseComponent';
import Checkbox from '../../../../../components/utils/checkbox/Checkbox';


export default class extends BaseComponent.Pure {
  // eslint-disable-next-line class-methods-use-this
  buildTestKey({ optimizer, loss, activation }) {
    return `${optimizer.value} + ${loss.value} + ${activation.value}`;
  }

  render() {
    const {
      target: {
        algorithms, optimizers = [], losses = [], activations = []
      } = {}
    } = this.props;

    const tests = [];
    if (algorithms && optimizers && losses && activations) {
      optimizers.forEach((optimizer) => {
        losses.forEach((loss) => {
          activations.forEach((activation) => {
            tests.push({
              optimizer,
              loss,
              activation
            });
          });
        });
      });
    }

    return (
      <div>
        <div>Các thử nghiệm sẽ tiến hành</div>
        <div>
          <MDBTable>
            <thead>
              <tr>
                <th><Checkbox title="Chọn tất cả" /></th>
                <th>STT</th>
                <th>Thử nghiệm</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test, index) => (
                <tr key={this.buildTestKey(test)} className="">
                  <td className="text-middle">
                    <Checkbox title="Chọn để thử nghiệm" />
                  </td>
                  <td className="text-middle text-center font-weight-bold">
                    {(index + 1).toString().padStart(2, '0')}
                  </td>
                  <td className="text-middle">
                    <span className="d-inline-block m-1 p-2 border">{test.optimizer.name}</span>
                    <span> <i className="fas fa-plus grey-text" /> </span>
                    <span className="d-inline-block m-1 p-2 border">{test.loss.name}</span>
                    <span> <i className="fas fa-plus grey-text" /> </span>
                    <span className="d-inline-block m-1 p-2 border">{test.activation.name}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </MDBTable>
        </div>
      </div>
    );
  }
}
