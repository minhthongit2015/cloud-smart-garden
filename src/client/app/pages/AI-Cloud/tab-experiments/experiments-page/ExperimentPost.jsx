import Post from '../../../../components/blog-base/post/Post';
import getContextOptions from './ExperimentPostContextOptions';
import AnyDialogHelper from '../../../../helpers/dialogs/any-dialog/AnyDialogHelper';

export default class extends Post {
  get postType() {
    return this.props.type || 'Experiment';
  }

  get contextOptions() {
    return getContextOptions(this.post);
  }

  handlePostClick(event) {
    AnyDialogHelper.openExperiment(this.post);
    this.dispatchEvent(event);
  }

  // render() {
  //   return this.post.title;
  // }
}
