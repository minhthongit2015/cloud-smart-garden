import React from 'react';
import './DropUploader.scss';
import classnames from 'classnames';


export default class extends React.Component {
  constructor(props) {
    super(props);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleStartUpload = this.handleStartUpload.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePaste = this.handlePaste.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.inputRef = React.createRef();
    this.state = {
      uploading: false
    };
  }

  handleInputChange(event) {
    if (event.target.name === 'video') {
      const match = event.target.value.match(/src="(.*?)"/);
      if (match && match[1]) {
        [, event.target.value] = match;
      }
    }
    this.dispatchUploadedEvent(event);
  }

  handleStartUpload() {
    this.setState({
      uploading: true
    });
  }

  handleFileUpload(event) {
    const { name } = event.target;
    this.fileToDataURL(event.target.files[0])
      .then((dataUrl) => {
        this.setState({ uploading: false });
        this.dispatchUploadedEvent({
          target: {
            name,
            value: dataUrl
          }
        });
      });
  }

  dispatchUploadedEvent(event) {
    const { value, name } = event.target;
    if (this.props.onChange) {
      this.props.onChange({
        target: {
          name,
          value
        },
        preventDefault: () => {}
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async fileToDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onabort = (error) => { console.log('file reading was aborted'); reject(error); };
      reader.onerror = (error) => { console.log('file reading has failed'); reject(error); };
      // reader.onloadstart = () => console.log('file reading start');
      // reader.onprogress = () => console.log('file reading progress');
      reader.onload = (event1) => {
        resolve(event1.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  handlePaste(event) {
    const { items } = event.clipboardData || event.originalEvent.clipboardData;
    Object.values(items).forEach((item) => {
      if (item.kind === 'file') {
        this.fileToDataURL(item.getAsFile())
          .then((dataUrl) => {
            this.setState({ uploading: false });
            const uploadEvent = {
              target: { name: this.props.name, value: dataUrl },
              preventDefault: () => {}
            };
            this.dispatchUploadedEvent(uploadEvent);
          });
      }
    });
  }

  handleDrop(event) {
    event.preventDefault();
    const { items } = event.dataTransfer || event.originalEvent.dataTransfer;
    Object.values(items).forEach((item) => {
      if (item.kind === 'file') {
        this.fileToDataURL(item.getAsFile())
          .then((dataUrl) => {
            this.setState({ uploading: false });
            const uploadEvent = {
              target: { name: this.props.name, value: dataUrl },
              preventDefault: () => {}
            };
            this.dispatchUploadedEvent(uploadEvent);
          });
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  handleDragOver(event) {
    event.preventDefault();
  }

  render() {
    const {
      className, wrapperProps, innerClass, useVideo = true,
      label, name, videoName, value = '', video = '', ...restProps
    } = this.props;
    const { uploading } = this.state;
    const urlInputValue = value && value.startsWith('http')
      ? value
      : '';

    return (
      <div
        className={classnames('drop-uploader d-flex flex-column', className)}
        onDrop={this.handleDrop}
        onDragOver={this.handleDragOver}
        {...wrapperProps}
      >
        <label
          className={classnames('drop-uploader__drop-zone rounded text-center', innerClass)}
          style={{ backgroundImage: `url(${value || ''})` }}
          {...restProps}
        >
          {uploading
            ? <span>đang tải ảnh lên...</span>
            : !value && <span>{label || 'tải ảnh lên'}</span>}
          <input
            type="file"
            accept="image/*"
            name={name}
            onChange={this.handleFileUpload}
            onInput={this.handleStartUpload}
            ref={this.inputRef}
            style={{ display: 'none' }}
          />
        </label>
        <input
          className="drop-uploader__url-input px-2 rounded"
          placeholder="URL hình ảnh"
          name={name}
          value={urlInputValue}
          onChange={this.handleInputChange}
          onPaste={this.handlePaste}
          autoComplete="off"
          autofill="off"
          spellCheck="false"
          autoCorrect="false"
        />
        {useVideo && (
          <input
            className="drop-uploader__url-input px-2 mt-2 rounded"
            placeholder="URL video"
            name={videoName}
            value={video}
            onChange={this.handleInputChange}
            onPaste={this.handlePaste}
            autoComplete="off"
            autofill="off"
            spellCheck="false"
            autoCorrect="false"
          />
        )}
      </div>
    );
  }
}
