import React from 'react';
import t from '../../../languages';
import SubPageGroup from '../../_base/SubPageGroup';


export default class extends SubPageGroup {
  constructor(props) {
    super(props, t('pages.myGarden.title.storehouse'));
    this.setMainMessage(`${t('pages.myGarden.message.storehouse')} 🥳`);
  }

  renderBody() {
    return (
      <div>
        {this.mainMessage}
      </div>
    );
  }
}
