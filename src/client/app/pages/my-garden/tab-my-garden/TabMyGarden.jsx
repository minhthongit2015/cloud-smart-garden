import React from 'react';
import t from '../../../languages';
import SubPageGroup from '../../_base/SubPageGroup';
import GardenModule from './GardenModule';
import SavedPostsDialogHelper from '../../../helpers/dialogs/SavedPostsDialogHelper';
import PostDetailsDialogHelper from '../../../helpers/dialogs/PostDetailsDialogHelper';


export default class extends SubPageGroup {
  constructor(props) {
    super(props, t('pages.myGarden.title.myGarden'));
    this.setGuideMessage(`${t('pages.myGarden.message.myGarden')} 🥳`);
  }

  componentDidMount() {
    super.componentDidMount();
    SavedPostsDialogHelper.checkToOpen();
    PostDetailsDialogHelper.checkToOpen();
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
