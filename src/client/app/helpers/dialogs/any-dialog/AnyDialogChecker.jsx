import PostService from '../../../services/blog/PostService';
import AnyDialogHelper from './AnyDialogHelper';
import HistoryHelper from '../../HistoryHelper';


export default class AnyDialogChecker {
  static init() {
    this.checkers = [
      this.checkAndOpenPost.bind(this)
    ];
    HistoryHelper.addPopListener((event) => {
      this.runAllChecks(event && event.state);
    });
  }

  static runAllChecks(state = window.history.state) {
    this.checkers.forEach(checker => checker(state));
  }

  static checkAndOpenPost() {
    const params = new URLSearchParams(window.location.search);
    const hashtag = params.get('hashtag');
    if (hashtag) {
      this.openPost(hashtag);
    } else {
      this.closePost();
    }
  }

  static openPost(hashtag) {
    return PostService.fetchPost(hashtag)
      .then((res) => {
        this.openPostByType(res.data[0]);
      });
  }

  static closePost() {
    AnyDialogHelper.close(AnyDialogHelper.Types.post);
    AnyDialogHelper.close(AnyDialogHelper.Types.experiment);
  }

  static openPostByType(post) {
    switch (post.__t) {
    case 'Experiment':
      return AnyDialogHelper.openExperiment(post);
    default:
      return AnyDialogHelper.openPost(post);
    }
  }
}
