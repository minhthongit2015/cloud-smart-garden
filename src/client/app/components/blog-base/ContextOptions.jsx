import React from 'react';

const ContextOptions = {
  save: { label: 'lưu bài viết', value: 'save' },
  unsave: { label: 'bỏ lưu bài viết', value: 'save' },
  saveDone: { label: 'đã lưu bài viết', value: 'save-done' }, // virtual option
  delete: { label: 'xóa bài viết', value: 'delete' },
  deleteDone: { label: 'xóa bài viết', value: 'delete-done' }, // virtual option
  update: { label: 'chỉnh sửa bài viết', value: 'update' },
  updateDone: { label: 'chỉnh sửa bài viết', value: 'update-done' }, // virtual option
  requestChange: { label: 'đề xuất chỉnh sửa', value: 'request-change' },
  requestChangeDone: { label: 'đề xuất chỉnh sửa', value: 'request-change-done' }, // virtual option
  iWillDoThis: {
    labelAdd: (
      <span role="img" className="i-will-do-this" aria-label="i-do" aria-labelledby="i-do">
        ✊ Thêm vào điều tôi sẽ làm
      </span>
    ),
    labelRemove: 'Bỏ khỏi điều tôi sẽ làm',
    value: 'i-will-do-this'
  }
};

export default ContextOptions;
