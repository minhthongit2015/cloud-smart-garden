import React, { Component } from 'react';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import BaseChart from '../../../components/charts/BaseChart';
import LiveConnect from '../../../services/WebSocket';
import { apiEndpoints } from '../../../utils/Constants';

class TabExperiments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataset: null
    };
  }

  componentDidMount() {
    this.subscribeDatasetDataChannel();
  }

  subscribeDatasetDataChannel() {
    LiveConnect.get(apiEndpoints.ai.datasetItem(1)).then((res) => {
      this.setState({
        dataset: res.data
      });
    });
  }

  render() {
    const { options } = this.props;
    const baseOptions = {

    };
    const { dataset } = this.state;

    return (
      <Section>
        <SectionHeader>Experiments</SectionHeader>
        <SectionBody>
          <ul>
            <li>Lựa chọn + Quan sát dataset</li>
            <li>Phân tích dataset</li>
            <li>Chọn model, thuật toán...</li>
            <li>Thử nghiệm -&gt; So sánh kết quả</li>
            <li>Cho phép Ctrl + Z</li>
          </ul>
          <BaseChart
            options={{
              ...options,
              ...baseOptions
            }}
            data={dataset || []}
          />
        </SectionBody>
      </Section>
    );
  }
}

export default TabExperiments;
