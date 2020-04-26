import React, { Component } from 'react';
import { Row, Col } from 'mdbreact';
import GardenStoryService from '../../../../../services/garden/GardenStoryService';
import GardenStory from './GardenStory';
import './GardenStoryList.scss';


export default class extends Component {
  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);
    this.state = {
      stories: []
    };
  }

  refresh() {
    this.fetchStories();
  }

  componentDidMount() {
    this.fetchStories();
  }

  fetchStories() {
    GardenStoryService.list()
      .then((rs) => {
        this.setState({
          stories: rs.data
        });
      });
  }

  render() {
    const { stories } = this.state;

    return (
      <Row className="garden-story-list py-3">
        <Col size="12" md="10" className="offset-md-1">
          <div>
            {stories.map(story => (
              <GardenStory key={story._id} story={story} />
            ))}
          </div>
        </Col>
      </Row>
    );
  }
}
