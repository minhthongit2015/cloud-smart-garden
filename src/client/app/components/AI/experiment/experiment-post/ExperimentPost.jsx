import Post from '../../../blog-base/post/Post';
import getContextOptions from './ProjectPostContextOptions';
import RouteConstants from '../../../../utils/RouteConstants';

export default class extends Post {
  get postType() {
    return this.props.type || 'Experiment';
  }

  get contextOptions() {
    return getContextOptions(this.post);
  }

  handlePostClick() {
    const { post } = this.props;
    const experimentPath = RouteConstants.aiExperimentILink(post.baseOrder);
    if (window.location.href.includes(experimentPath)) return;
    window.historyz.push(experimentPath);
  }

  // render() {
  //   return this.post.title;
  // }
}
