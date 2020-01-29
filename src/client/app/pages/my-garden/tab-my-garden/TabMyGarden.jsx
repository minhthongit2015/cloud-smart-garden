import React from 'react';
import t from '../../../languages';
import SubPageGroup from '../../_base/SubPageGroup';
import GardenModule from './GardenModule';
import AnyDialogChecker from '../../../helpers/dialogs/any-dialog/AnyDialogChecker';


export default class extends SubPageGroup {
  constructor(props) {
    super(props, t('pages.myGarden.title.myGarden'));
    this.setGuideMessage(`${t('pages.myGarden.message.myGarden')} 🥳`);
  }

  componentDidMount() {
    super.componentDidMount();
    AnyDialogChecker.runAllChecks();
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
