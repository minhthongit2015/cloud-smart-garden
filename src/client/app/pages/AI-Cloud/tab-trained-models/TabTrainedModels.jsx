import React from 'react';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import BasePage from '../../_base/BasePage';
import t from '../../../languages';

export default class TabTrainedModels extends BasePage {
  constructor(props) {
    super(props, t('pages.earthPicture.title.climate'));
  }

  render() {
    return (
      <Section>
        <SectionHeader>Trained Models</SectionHeader>
        <SectionBody>
          <ul>
            <li>Danh sách Trained Models</li>
            <li>Xem thông tin chi tiết model (layers, algorithm...)</li>
            <li>Lựa chọn model vào các Model Set</li>
            <li>(Model Set là bộ các model đầy đủ cho một vườn)</li>
            <li>Đặt số hiệu phiên bản và quản lý xuất bản các model lên mạng lưới chia sẻ</li>
          </ul>
        </SectionBody>
      </Section>
    );
  }
}
