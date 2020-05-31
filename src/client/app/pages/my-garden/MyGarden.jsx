import React from 'react';
import t from '../../languages';
import Section from '../../layouts/base/section/Section';
import UserService from '../../services/user/UserService';
import GardenHeader from './parts/GardenHeader';
import Garden from './parts/Garden';
import StoriesSection from './parts/StoriesSection';
import MyGardenService from '../../services/garden/MyGardenService';
import RouteConstants from '../../utils/RouteConstants';
import './MyGarden.scss';
import WithNavPage from '../_base/WithNavPage';
import { IconSmileCity, IconMyGarden, IconEarth } from '../../../assets/icons';


export default class extends WithNavPage {
  constructor(props) {
    super(props, t('pages.myGarden.title.myGarden'), true);
    this.bind(this.handleNewPlantAdded);
    this.navs = [
      { title: 'Xuống Phố', link: RouteConstants.streetLink, icon: IconSmileCity },
      // { title: 'Bạn Bè', link: RouteConstants.streetLink, icon: IconMyGarden },
      { title: 'Địa Danh Nổi Tiếng', link: RouteConstants.userNetworkLink, icon: IconEarth }
    ];
    this.state = {
      ...this.state,
      gardens: []
    };
  }

  componentDidMount() {
    super.componentDidMount();
    this.fetchGardens();
  }

  fetchGardens() {
    MyGardenService.list()
      .then((res) => {
        const gardens = res.data;
        this.setState({
          gardens,
          brand: gardens[0] && gardens[0].title
        });
      });
  }

  handleNewPlantAdded() {
    this.fetchGardens();
  }

  renderGardens() {
    const { gardens = [] } = this.state;

    return (
      <div className="mt-4">
        {gardens.map(garden => (
          <Garden
            garden={garden}
            key={garden._id}
            onNewPlantAdded={this.handleNewPlantAdded}
            onPlantRemoved={this.handleNewPlantAdded}
          />
        ))}
      </div>
    );
  }

  renderStories() {
    const { gardens = [] } = this.state;
    return (
      <StoriesSection gardens={gardens} />
    );
  }

  renderBody() {
    const { gardens: [firstGarden] } = this.state;
    const { user } = UserService;
    const { name } = user || {};
    return (
      <div className="px-2 px-md-4 py-5">
        <GardenHeader garden={firstGarden} />
        {this.renderNavLinks()}
        <Section beautyFont big noHR title={`${name || ''}\r\n~ garden ~`} className="mt-5 mb-5">
          <div className="p-0 p-md-2 mt-4">
            {this.renderGardens()}
            {this.renderStories()}
          </div>
        </Section>
      </div>
    );
  }
}
