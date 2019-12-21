import React from 'react';
import t from '../../../languages';
import SubPageGroup from '../../_base/SubPageGroup';


export default class extends SubPageGroup {
  constructor(props) {
    super(props, t('pages.myGarden.title.help'));
    this.setMainMessage(`${t('pages.myGarden.message.help')} 🥳`);
  }

  renderBody() {
    return (
      <div>
        {this.mainMessage}
      </div>
    );
  }
}
