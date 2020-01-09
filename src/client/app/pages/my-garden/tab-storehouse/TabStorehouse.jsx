import React from 'react';
import t from '../../../languages';
import SubPageGroup from '../../_base/SubPageGroup';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';


export default class extends SubPageGroup {
  constructor(props) {
    super(props, t('pages.myGarden.title.storehouse'));
    this.setMainMessage(`${t('pages.myGarden.message.storehouse')} 🥳`);
  }

  // eslint-disable-next-line class-methods-use-this
  renderBody() {
    return (
      <Section>
        <SectionHeader>Mô tả</SectionHeader>
        <SectionBody>
          <ol>
            <li>Quản lí danh sách vật dụng đã mua</li>
            <li>  (ngày mua, số lượng, chi phí, còn lại trong kho bao nhiêu)</li>
            <li>Giới thiệu thêm một số vật dụng có thể cần để có thể mua ngay tại đây</li>
          </ol>
        </SectionBody>
      </Section>
    );
  }
}
