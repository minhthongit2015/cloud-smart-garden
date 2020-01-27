import React from 'react';
import { MDBBtn } from 'mdbreact';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import t from '../../../languages';
import BasePage from '../../_base/BasePage';
import DatasetModule from './DatasetModule';
import DynamicTimeSeries from '../../../components/charts/base/DynamicTimeSeriesApex';
import ApiEndpoints from '../../../utils/ApiEndpoints';
import Calendar from '../../../components/utils/calendar/Calendar';
import superrequest from '../../../utils/superrequest';
import EditableLineChart from '../../../components/charts/base/EditableLineChart';


export default class TabDataset extends BasePage {
  constructor(props) {
    super(props, t('pages.aiCloud.title.datasets'));
    this.postModuleRef = React.createRef();
    this.bind(this.handleCalendarChange, this.handleCreateDataset, this.handleGenerateRecords);
    this.state = {
      selection: null
    };
  }

  handleCalendarChange(event, selection) {
    this.setState({
      selection
    });
  }

  handleGenerateRecords() {
    const { selection } = this.state;
    superrequest.agentPost(ApiEndpoints.generateRecords, selection);
  }

  handleCreateDataset() {
    this.postModuleRef.current.newPostRef.current.setPost({
      title: 'Dataset 02',
      days: this.state.selection
    });
  }

  render() {
    const { selection } = this.state;
    return (
      <React.Fragment>
        <DynamicTimeSeries endPoint={ApiEndpoints.records} />
        <EditableLineChart />
        <Calendar selection={selection} onChange={this.handleCalendarChange} months={2} />
        <div className="text-center mt-4 mb-3">
          <MDBBtn onClick={this.handleGenerateRecords} className="mr-3">
            <i className="fas fa-plus-square" /> Tạo dữ liệu mẫu
          </MDBBtn>
          <MDBBtn onClick={this.handleCreateDataset}>
            <i className="fas fa-plus-square" /> Tạo Dataset
          </MDBBtn>
        </div>
        <DatasetModule ref={this.postModuleRef} />
        <Section>
          <SectionHeader>Note</SectionHeader>
          <SectionBody>
            <section>Lựa chọn + Quan sát dataset</section>
            <section>Phân tích dataset</section>
            <section>Chỉnh sửa dataset</section>
            <section>Thử nghiệm lại trên các Experiment</section>
            <div>Cho phép Ctrl + Z</div>
          </SectionBody>
        </Section>
      </React.Fragment>
    );
  }
}
