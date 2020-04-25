import React from 'react';
import t from '../../languages';
import WithNavPage from '../_base/WithNavPage';
import Section from '../../layouts/base/section/Section';
import UserService from '../../services/user/UserService';
import GardenHeader from './parts/GardenHeader';
import Garden from './parts/Garden';
import StoriesSection from './parts/StoriesSection';
import GardenModule from './tab-my-garden/GardenModule';
import StationModule from './tab-stations/StationModule';
import MyGardenService from '../../services/garden/MyGardenService';


export default class extends WithNavPage {
  constructor(props) {
    super(props, t('pages.myGarden.title.myGarden'), true);
    this.bind(this.handleNewPlantAdded);
    this.navs = [
      'Smile City',
      'Bạn Bè',
      'Gia Đình',
      'review',
      'star',
      'tag'
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

  // eslint-disable-next-line class-methods-use-this
  renderStories() {
    const { gardens = [] } = this.state;
    return (
      <StoriesSection gardens={gardens} />
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderBody() {
    const { gardens: [firstGarden] } = this.state;
    const { user } = UserService;
    const { name } = user || {};
    return (
      <div className="px-2 px-md-4 py-5">
        <GardenHeader garden={firstGarden} />
        <Section beautyFont bigFont noHR title={`${name || ''}\r\n~ garden ~`} className="mt-5 mb-5">
          <div className="p-0 p-md-2 mt-4">
            {this.renderGardens()}
            {this.renderStories()}
          </div>
        </Section>
      </div>
    );
  }
}
