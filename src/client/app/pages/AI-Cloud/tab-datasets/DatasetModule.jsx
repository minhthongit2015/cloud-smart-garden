/* eslint-disable class-methods-use-this */
import NewDataset from './NewDataset';
import DatasetService from '../../../services/AI/DatasetService';
import DatasetPost from './DatasetPost';
import PostsModule from '../../../components/blog-base/posts-module/PostsModule';


export default class extends PostsModule {
  get service() {
    return DatasetService;
  }

  get NewPostComponent() {
    return NewDataset;
  }

  get PostComponent() {
    return DatasetPost;
  }
}
