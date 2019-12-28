import React from 'react';
import t from '../../../languages';
import SubPageGroup from '../../_base/SubPageGroup';
import GardenModule from './GardenModule';


export default class extends SubPageGroup {
  constructor(props) {
    super(props, t('pages.myGarden.title.myGarden'));
    this.setGuideMessage(`${t('pages.myGarden.message.myGarden')} 🥳`);
  }

  // eslint-disable-next-line class-methods-use-this
  renderBody() {
    return (
      <React.Fragment>
        <GardenModule />
      </React.Fragment>
    );
  }
}
