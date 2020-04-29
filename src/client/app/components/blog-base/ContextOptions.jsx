
const ContextOptions = {
  save: { label: 'lưu bài viết', value: 'save' },
  unsave: { label: 'bỏ lưu bài viết', value: 'save' },
  saved: { label: 'đã lưu bài viết', value: 'saved' }, // virtual option
  delete: { label: 'xóa bài viết', value: 'delete' },
  deleted: { label: 'xóa bài viết', value: 'deleted' }, // virtual option
  update: { label: 'chỉnh sửa bài viết', value: 'update' },
  updateDone: { label: 'chỉnh sửa bài viết', value: 'update-done' }, // virtual option
  requestChange: { label: 'đề xuất chỉnh sửa', value: 'request-change' },
  requestChangeDone: { label: 'đề xuất chỉnh sửa', value: 'request-change-done' } // virtual option
};

export default ContextOptions;
