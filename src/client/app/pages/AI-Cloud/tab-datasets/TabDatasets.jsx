import React from 'react';
import { MDBBtn } from 'mdbreact';
// import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import t from '../../../languages';
import DatasetModule from './DatasetModule';
import DynamicTimeSeries from '../../../components/charts/base/DynamicTimeSeriesApex';
import ApiEndpoints from '../../../utils/ApiEndpoints';
import superrequest from '../../../utils/superrequest';
import EditableLineChart from '../../../components/charts/base/EditableLineChart';
import AnyDialogChecker from '../../../helpers/dialogs/any-dialog/AnyDialogChecker';
import SubPageGroup from '../../_base/SubPageGroup';
import AdvCalendar from '../../../components/form/inputs/calendar/AdvCalendar';


export default class TabDataset extends SubPageGroup {
  get newPost() {
    return this.postModuleRef.current && this.postModuleRef.current.newPostRef.current;
  }

  constructor(props) {
    super(props, t('pages.aiCloud.title.datasets'));
    this.postModuleRef = React.createRef();
    this.bind(this.handleCreateDataset, this.handleGenerateRecords);
    this.state = {
      selection: []
    };
  }

  componentDidMount() {
    super.componentDidMount();
    AnyDialogChecker.runAllChecks();
  }

  handleGenerateRecords() {
    const { selection } = this.state;
    superrequest.agentPost(ApiEndpoints.generateRecords, selection)
      .then(rs => alert(`${rs.data.length} days's records has been generated`));
  }

  handleCreateDataset() {
    this.newPost.setPost({
      days: this.state.selection
    });
  }

  render() {
    const { selection } = this.state;
    return (
      <React.Fragment>
        <DynamicTimeSeries group="test" endPoint={ApiEndpoints.records} />
        <EditableLineChart group="test" />
        <AdvCalendar
          name="selection"
          value={selection}
          onChange={this.handleInputChange}
        />
        <div className="text-center mt-4 mb-3">
          <MDBBtn onClick={this.handleGenerateRecords} className="mr-3">
            <i className="fas fa-plus-square" /> Tạo dữ liệu mẫu
          </MDBBtn>
          <MDBBtn onClick={this.handleCreateDataset}>
            <i className="fas fa-plus-square" /> Tạo Dataset
          </MDBBtn>
        </div>
        <DatasetModule ref={this.postModuleRef} everyoneCanPost />
        {/* <Section>
          <SectionHeader>Note</SectionHeader>
          <SectionBody>
            <section>Lựa chọn + Quan sát dataset</section>
            <section>Phân tích dataset</section>
            <section>Chỉnh sửa dataset</section>
            <section>Thử nghiệm lại trên các Experiment</section>
            <div>Cho phép Ctrl + Z</div>
          </SectionBody>
        </Section> */}
      </React.Fragment>
    );
  }
}
