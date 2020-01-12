import React from 'react';
import t from '../../../languages';
import SubPageGroup from '../../_base/SubPageGroup';
import DatForm from './DatForm';


export default class extends SubPageGroup {
  constructor(props) {
    super(props, t('pages.myGarden.title.help'));
    this.setMainMessage(`${t('pages.myGarden.message.help')} 🥳`);

    this.handleSubmit = this.handleChange.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      inputValue: ''
    };
  }

  handleChange(event) {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert(`Value input:${this.state.inputValue}`);
    event.preventDefault();
  }

  renderBody() {
    const { inputValue } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <DatForm
            name="inputValue"
            value={inputValue}
            onChange={this.handleChange}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
