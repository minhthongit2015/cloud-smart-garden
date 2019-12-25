/* eslint-disable class-methods-use-this */
import NewPost from '../../blog/new-post/NewPost';


export default class extends NewPost {
  get action() {
    return '/api/v1/AI-Central/projects';
  }
}
