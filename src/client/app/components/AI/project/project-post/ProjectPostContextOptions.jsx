import UserService from '../../../../services/user/UserService';
import CategoryService from '../../../../services/blog/CategoryService';
import ContextOptions from '../../../blog-base/ContextOptions';


function getOwnerCtxOptions(post) {
  return [
    UserService.isLoggedIn && post.isSaved
      ? ContextOptions.unsave : ContextOptions.save,
    ContextOptions.update,
    ContextOptions.delete
  ];
}

function getAdminCtxOptions(post) {
  return getOwnerCtxOptions(post);
}
function getModeratorCtxOptions(post) {
  return getOwnerCtxOptions(post);
}
function getNormalUserCtxOptions(post) {
  return [
    UserService.isLoggedIn && post.isSaved
      ? ContextOptions.unsave : ContextOptions.save,
    ContextOptions.requestChange
  ];
}
function getNoLoginCtxOptions(post) {
  return [
    ContextOptions.requestChange,
    UserService.isLoggedIn && post.isSaved
      ? ContextOptions.unsave : ContextOptions.save
  ];
}

/**
 * 1. Admin sẽ có tất cả quyền của owner
 * 2. Moderator hiện sẽ có tất cả quyền của owner
 * 3. Owner sẽ có quyền "Sửa", "Xóa", "Lưu"
 * 4. Normal User sẽ có "Đề xuất sửa", "Lưu"
 */
export default function getContextOptions(post) {
  let options = [];
  if (UserService.isAdmin) {
    options = getAdminCtxOptions(post);
  } else if (UserService.isModerator) {
    options = getModeratorCtxOptions(post);
  } else if (UserService.isPostOwner(post)) {
    options = getOwnerCtxOptions(post);
  } else if (UserService.isNormalUser) {
    options = getNormalUserCtxOptions(post);
  } else {
    options = getNoLoginCtxOptions(post);
  }
  return options;
}
