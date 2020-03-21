import React from 'react';
import t from '../../languages';
import WithNavPage from '../_base/WithNavPage';
import FixedRatioImage from '../../components/utils/fixed-ratio-image/FixedRatioImage';
import GardenService from '../../services/garden/GardenService';
import GardenModule from './tab-my-garden/GardenModule';
import Section from '../../layouts/base/section/Section';
import { SectionBody } from '../../layouts/base/section';
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

  renderGardens() {
    const { gardens = [] } = this.state;

    return (
      <div className="mt-4">
        {gardens.map(garden => (
          <div key={garden._id}>
            {this.renderGarden(garden)}
          </div>
        ))}
      </div>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderGarden(garden) {
    return (
      <Section title={garden.title} beautyFont>
        <SectionBody>
          <div>plant list</div>
          <div>Plant 01</div>
          <div>Plant 02</div>
          <div>Plant 03</div>
          <div>Plant 04</div>
        </SectionBody>
      </Section>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderStories() {
    return (
      <div>
        <div>Today Song</div>
        {/* A little bit mood for this day */}
        <div>Stories</div>
      </div>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderBody() {
    const { gardens: [firstGarden] } = this.state;
    return (
      <div>
        {firstGarden && <FixedRatioImage className="rounded" src={firstGarden.preview} ratio={1 / 3} />}
        {this.renderGardens()}
        {this.renderStories()}
        <GardenModule />
      </div>
    );
  }
}
