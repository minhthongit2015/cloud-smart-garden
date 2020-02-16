import React from 'react';
import {
  MDBInput, MDBCard, MDBCardBody, MDBCardHeader
} from 'mdbreact';
import { Prompt } from 'react-router-dom';
import BaseComponent from '../../_base/BaseComponent';
import DropUploader from '../drop-uploader/DropUploader';
import { isZeroVariable } from '../../../utils';
import t from '../../../languages';


export default class BaseForm extends BaseComponent.Pure {
  get formData() {
    return this.state.formData;
  }

  // eslint-disable-next-line class-methods-use-this
  get excludeKeys() {
    return ['status', '__t'];
  }

  get isEmpty() {
    try {
      const { formData, excludeKeys } = this;
      return Object.entries(formData || {})
        .every(([key, value]) => excludeKeys.includes(key) || isZeroVariable(value));
    } catch (error) {
      console.log(error);
      return true;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  get preventLeaveMessage() {
    return t('components.blogBase.newForm.preventLeaveMessage');
  }

  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      originData: {}
    };
  }

  setDataState(name, value) {
    this.setState(prevState => ({
      formData: { ...prevState.formData, [name]: value }
    }));
  }

  setFormData(formData) {
    this.setState({
      formData: { ...formData },
      originData: formData
    });
  }

  handleInputChange(event) {
    if (!event) return;
    const { target: { name, value } } = event;
    this.setDataState(name, value);
  }

  handleSubmit() {
    this.dispatchEvent(this.Events.submit, this.formData);
  }

  // Demo usage
  render() {
    const { formData } = this;
    const inputs = [
      {
        tag: MDBInput,
        label: 'Text input',
        name: 'textInput',
        value: formData.textInput
      },
      {
        tag: MDBInput,
        type: 'checkbox',
        label: 'Check box',
        name: 'isChecked',
        value: formData.isChecked
      },
      {
        tag: DropUploader,
        name: 'media',
        value: formData.picture
      }
    ];

    return (
      <MDBCard>
        <Prompt
          when={!this.isEmpty}
          message={this.preventLeaveMessage}
        />
        <MDBCardHeader className="d-flex justify-content-between">
           Demo Form
        </MDBCardHeader>
        <MDBCardBody>
          <form onSubmit={this.handleSubmit}>
            {inputs.map(({ tag: InputTag, ...restProps }) => (
              <InputTag {...restProps} onChange={this.handleInputChange} />
            ))}
          </form>
        </MDBCardBody>
      </MDBCard>
    );
  }
}
