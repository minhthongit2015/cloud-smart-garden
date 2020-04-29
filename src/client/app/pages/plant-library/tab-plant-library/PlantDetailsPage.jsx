import React from 'react';
import Select from 'react-select';
import PostDetails from '../../../components/blog-base/post-details/PostDetails';
// import DatasetService from '../../../services/garden/PlantService';


export default class extends PostDetails {
  fetchModels() {

  }

  render() {
    const { data: post = {} } = this.props;
    const {
      _id, previewPhoto, video, title, summary, content, categories, createdAt,
      totalRating, totalVotes, rating
    } = post;
    const { models } = this.state || {};

    return (
      <div>
        hello {title}
        <Select
          options={models}
        />
      </div>
    );
  }
}
