import React from 'react';
import t from '../../languages';
import WithNavPage from '../_base/WithNavPage';
import FixedRatioImage from '../../components/utils/fixed-ratio-image/FixedRatioImage';
import GardenService from '../../services/garden/GardenService';
import GardenModule from './tab-my-garden/GardenModule';
import Section from '../../layouts/base/section/Section';
import { SectionBody } from '../../layouts/base/section';
import _gardens from './gardens';
import UserService from '../../services/user/UserService';
// import RouteConstants from '../../utils/RouteConstants';
// import TabMyGarden from './tab-my-garden/TabMyGarden';
// import TabStorehouse from './tab-storehouse/TabStorehouse';
// import TabHelp from './tab-help/TabHelp';
// import TabStations from './tab-stations/TabStations';
import Video from '../../components/utils/video/Video';
import PerchIcon from '../../components/utils/image/PerchIcon';
import TodaySong from './components/TodaySong';


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
    super.componentDidMount();
    GardenService.fetchMyGarden()
      .then((res) => {
        const gardens = _gardens || res.data;
        this.setState({
          gardens,
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
          {garden.stations.map(station => (
            this.renderStation(station)
          ))}
        </SectionBody>
      </Section>
    );
  }

  renderStation(station) {
    return (
      <div>
        <div className="px-2 border-bottom">{station.title}</div>
        <div className="d-flex flex-wrap">
          {station.crops.map(crop => (
            this.renderPlant(crop.plant)
          ))}
          {this.renderPlant(null)}
        </div>
      </div>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderPlant(plant) {
    const { preview = '', title } = plant || {};
    return (
      <div style={{ width: '150px' }} className="overlapable p-2 w-lg-7 w-md-5 w-sm-3 w-2">
        <FixedRatioImage src={preview} ratio={1.75} frame="rounded" />
        <div className="overlap bottom auto-size ml-3 mb-2 text-white">{title}</div>
        <div className="overlap right auto-size mr-3 mt-2 text-white small">
          <div>Temp: 27.5°C</div>
          <div>Humi: 80%</div>
        </div>
      </div>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderStories() {
    return (
      <Section beautyFont title="Stories" className="mt-5">
        <GardenModule />
      </Section>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderBody() {
    const { gardens: [firstGarden] } = this.state;
    return (
      <div className="p-2 p-md-4">
        <div className="position-relative">
          {firstGarden && <FixedRatioImage className="rounded" src={firstGarden.preview} ratio={1 / 3} />}
          <PerchIcon src="/icons/garden/owl.svg" alt="an Own" flip left="20px" />
          <PerchIcon src="/icons/garden/owl_2.svg" alt="an Young Own" flip left="50px" />
          <PerchIcon src="/icons/garden/bee.svg" alt="a Bee" flip right="10px" />
          <TodaySong src="https://youtu.be/Y7BBiIZRFrc" />
        </div>
        <Section beautyFont bigFont hr={false} title={`${UserService.user.name}\r\n~ garden ~`} className="mt-4">
          <div className="p-0 p-md-2">
            {this.renderGardens()}
            {this.renderStories()}
          </div>
        </Section>
      </div>
    );
  }
}
