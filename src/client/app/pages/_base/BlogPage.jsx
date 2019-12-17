import BasePage from './BasePage';
import PostService from '../../services/PostService';
import SavedPostsDialogService from '../../services/SavedPostsDialogService';
import PostDetailsDialogService from '../../services/PostDetailsDialogService';
// import NewsTracker from '../../services/NewsTracker';


export default class extends BasePage {
  constructor(...args) {
    super(...args);
    window.historyz = args[0].history || window.historyz;
  }

  componentDidMount() {
    super.componentDidMount();
    const params = new URLSearchParams(window.location.search);

    const isShowSavedPost = params.get('saved-posts');
    if (isShowSavedPost) {
      SavedPostsDialogService.openSavedPostsInCurrentHistory();
    }

    const hashtag = params.get('hashtag');
    if (hashtag) {
      PostDetailsDialogService.openPostDetailsCurrentTab(hashtag);
      PostService.refreshCache();
    }

    // NewsTracker.checkUnreadPosts();
  }
}
