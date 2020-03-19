import React from 'react';
import t from '../../languages';
import WithNavPage from '../_base/WithNavPage';
import FixedRatioImage from '../../components/utils/fixed-ratio-image/FixedRatioImage';
import GardenService from '../../services/garden/GardenService';
import GardenModule from './tab-my-garden/GardenModule';
// import RouteConstants from '../../utils/RouteConstants';
// import TabMyGarden from './tab-my-garden/TabMyGarden';
// import TabStorehouse from './tab-storehouse/TabStorehouse';
// import TabHelp from './tab-help/TabHelp';
// import TabStations from './tab-stations/TabStations';


export default class extends WithNavPage {
  constructor(props) {
    super(props, t('pages.myGarden.nav.myGarden'), true);
    this.navs = [
      'Smile City',
      'Bạn Bè',
      'Gia Đình'
    ];
    this.state = {
      ...this.state,
      gardens: []
    };
  }

  componentDidMount() {
    GardenService.fetchMyGarden()
      .then((res) => {
        const gardens = res.data;
        this.setState({
          gardens: res.data,
          brand: gardens[0] && gardens[0].title
        });
      });
  }

  // eslint-disable-next-line class-methods-use-this
  renderBody() {
    const { gardens: [firstGarden] } = this.state;
    return (
      <div>
        {firstGarden && <FixedRatioImage className="rounded" src={firstGarden.preview} ratio={1 / 3} />}
        <GardenModule />
      </div>
    );
  }
}
