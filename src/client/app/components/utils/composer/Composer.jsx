import React from 'react';
import { Editor } from '@toast-ui/react-editor';

export default class extends React.Component {
  get value() {
    if (this.inputRef.current) {
      return this.inputRef.current.getInstance().getValue();
    }
    return '';
  }

  set value(value) {
    this.inputRef.current.getInstance().setValue(value);
  }

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.contentConfig = {
      previewStyle: 'tab',
      height: '350px',
      initialEditType: 'wysiwyg',
      useCommandShortcut: true,
      exts: [
        {
          name: 'chart',
          minWidth: 100,
          maxWidth: 600,
          minHeight: 100,
          maxHeight: 300
        },
        'scrollSync',
        'colorSyntax',
        'uml',
        'mark',
        'table'
      ]
    };
  }

  render() {
    const { initialValue } = this.props;
    const onChangeProp = {};
    // if (!this.inputRef.current) {
    //   onChangeProp.onChange = this.rerender;
    // }
    return (
      <Editor
        ref={this.inputRef}
        {...this.contentConfig}
        initialValue={initialValue}
        {...onChangeProp}
      />
    );
  }
}
