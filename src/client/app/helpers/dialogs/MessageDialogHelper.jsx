import React from 'react';
import AnyDialogHelper from './any-dialog/AnyDialogHelper';


export default class {
  static show(title, message) {
    AnyDialogHelper.openMessage(title, () => <div>{message}</div>);
  }

  static showUpComingFeature(feature) {
    switch (feature) {
    case 'request-update':
      this.show(
        'Have a nice day! /=)',
        '(20/10) Tính năng đang được hoàn thành, mời bạn thử lại sau ít ngày.'
      );
      break;
    case 'save-post':
      this.show(
        'Wait me a second...',
        '(21/10) Tính năng đang được hoàn thành, mời bạn thử lại sau ít ngày.'
      );
      break;
    case 'i-will-do-this':
      this.show(
        'Tính năng đang xây dựng',
        '(24/10) Tính năng đang được hoàn thành, mời bạn thử lại sau ít ngày.'
      );
      break;
    default:
      break;
    }
  }

  static showSuccessMessage(feature, moreInfo) {
    switch (feature) {
    case 'request-update':
      this.show(
        'Have a nice day! /=)',
        '(20/10) Tính năng đang được hoàn thành, mời bạn thử lại sau ít ngày.'
      );
      break;
    case 'save-post':
      if (moreInfo) {
        this.show(
          'Bài viết đã được lưu', 'Bạn có thể xem lại các bài viết đã lưu tại mục "Bài viết đã lưu" trên avatar.'
        );
      } else {
        this.show(
          'Đã bỏ lưu bài viết'
        );
      }
      break;
    case 'i-will-do-this':
      this.show(
        'Tính năng đang xây dựng',
        'Cảm ơn bạn đã cố gắng cùng mọi người!'
      );
      break;
    default:
      break;
    }
  }
}
