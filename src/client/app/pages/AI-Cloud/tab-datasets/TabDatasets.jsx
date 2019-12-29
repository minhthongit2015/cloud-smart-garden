import React from 'react';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import RecordsStream from '../../../components/charts/AI/RecordsStream';
import t from '../../../languages';
import BasePage from '../../_base/BasePage';
import DatasetModule from './DatasetModule';
import superrequest from '../../../utils/superrequest';
import DatasetComponent from '../../../components/charts/AI/DatasetComponent';
import NivoHelper from '../../../helpers/charts/NivoHelper';

export default class TabDataset extends BasePage {
  constructor(props) {
    super(props, t('pages.aiCloud.title.datasets'));
    this.state = {
      chartData: []
    };
  }

  componentDidMount() {
    super.componentDidMount();
    this.fetchRecords();
  }

  fetchRecords() {
    superrequest.get('/api/v1/garden/records?limit=100')
      .then((res) => {
        if (!res || !res.ok) {
          return;
        }
        this.setState({
          chartData: NivoHelper.recordsToLine(res.data)
        });
      });
  }

  onSaveDataset(/* dataset */) {
    console.log(this.state.dataset);
    // ExperimentService.updateDataset(dataset);
  }

  render() {
    const { chartData } = this.state;
    return (
      <React.Fragment>
        {/* <RecordsStream
          options={{
            ...options,
            ...baseOptions
          }}
          data={chartData}
        /> */}
        {/* <DatasetComponent
          ref={this.datasetChartRef}
          dataset={chartData}
          onSave={this.onSaveDataset}
        /> */}
        <DatasetModule />
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
