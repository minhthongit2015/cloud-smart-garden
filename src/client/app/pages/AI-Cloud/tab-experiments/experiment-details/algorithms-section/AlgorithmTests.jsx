import React from 'react';
import { MDBTable } from 'mdbreact';
import BaseComponent from '../../../../../components/_base/BaseComponent';
import Checkbox from '../../../../../components/utils/checkbox/Checkbox';
import { findByKey } from '../../../../../utils';


export default class extends BaseComponent {
  constructor(props) {
    super(props);
    this.bind(this.handleSelectAll, this.handleSelectTest);
  }

  handleSelectAll() {
    const { editingTarget, editingTarget: { tests } = {} } = this.props;
    const isSelectedAll = tests.every(test => test.active);
    tests.forEach((test) => { test.active = !isSelectedAll; });
    this.forceUpdate();
    this.dispatchEvent(this.Events.change, editingTarget);
  }

  handleSelectTest(event) {
    const { currentTarget: { dataset: { key } } } = event;
    const { editingTarget, editingTarget: { tests } = {} } = this.props;
    const test = findByKey(key, tests);
    test.active = !test.active;
    this.forceUpdate();
    this.dispatchEvent(this.Events.change, editingTarget);
  }

  render() {
    const { editingTarget: { tests = [] } = {} } = this.props;
    const isSelectedAll = tests.every(test => test.active);

    return (
      <div>
        <div>Các thử nghiệm sẽ tiến hành</div>
        <div>
          <MDBTable>
            <thead>
              <tr>
                <th className="text-middle text-center">
                  <Checkbox
                    checked={isSelectedAll}
                    title="Chọn tất cả"
                    onChange={this.handleSelectAll}
                  />
                </th>
                <th className="text-middle text-center">STT</th>
                <th>Thử nghiệm</th>
              </tr>
            </thead>
            <tbody>
              {tests.map(({
                optimizer, loss, activation, key, active
              }, index) => (
                <tr key={key} className="">
                  <td className="text-middle text-center">
                    <Checkbox
                      data-key={key}
                      checked={active}
                      title="Chọn để thử nghiệm"
                      onChange={this.handleSelectTest}
                    />
                  </td>
                  <td className="text-middle text-center">
                    {(index + 1).toString().padStart(2, '0')}
                  </td>
                  <td className="text-middle">
                    <span className="d-inline-block m-1 p-2 border">{optimizer.name}</span>
                    <span> <i className="fas fa-plus grey-text" /> </span>
                    <span className="d-inline-block m-1 p-2 border">{loss.name}</span>
                    <span> <i className="fas fa-plus grey-text" /> </span>
                    <span className="d-inline-block m-1 p-2 border">{activation.name}</span>
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
