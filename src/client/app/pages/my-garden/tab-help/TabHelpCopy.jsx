import React from 'react';
import t from '../../../languages';
import SubPageGroup from '../../_base/SubPageGroup';
import { Section, SectionBody, SectionHeader } from '../../../layouts/base/section';


export default class extends SubPageGroup {
  constructor(props) {
    super(props, t('pages.myGarden.title.help'));
    this.setMainMessage(`${t('pages.myGarden.message.help')} 🥳`);
  }

  // eslint-disable-next-line class-methods-use-this
  renderBody() {
    return (
      <Section>
        <SectionHeader>Mô tả</SectionHeader>
        <SectionBody>
          <ol>
            <li>Tìm kiếm trợ giúp khi gặp vấn đề</li>
            <li>Danh sách chuyên gia cây trồng có thể gọi ngay</li>
            <li>Tài liệu liên quan để tự đọc và tự xử lý nếu muốn tiết kiệm</li>
          </ol>
        </SectionBody>
      </Section>
    );
  }
}
