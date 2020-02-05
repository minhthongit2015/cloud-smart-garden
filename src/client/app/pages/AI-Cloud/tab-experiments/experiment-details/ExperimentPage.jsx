/* eslint-disable class-methods-use-this */
import React from 'react';
import {
  Row, Col, MDBCollapse, MDBBtn
} from 'mdbreact';
import { Section, SectionHeader, SectionBody } from '../../../../layouts/base/section';
import { ExperimentTargets } from '../../../../utils/Constants';
import ExperimentBaseInfo from './components/ExperimentBaseInfo';
import BaseComponent from '../../../../components/BaseComponent';
import AlgorithmsSelect from './components/AlgorithmsSelect';
import DatasetsSelect from './components/DatasetsSelect';
import AlgorithmTests from './components/AlgorithmTests';
import ExperimentTargetsComp from './components/ExperimentTargets';
import FeaturesSelect from './components/FeaturesSelect';
import OutputsSelect from './components/OutputsSelect';
import TrainingSection from './components/TrainingSection';
import PredictSection from './components/PredictSection';


export default class extends BaseComponent {
  constructor(props) {
    super(props);
    this.bind(
      this.handleTargetChange, this.toggleEditingTarget,
      this.handleAlgorithmsChange
    );

    const targets = this.getCachedValue('targets', { ...ExperimentTargets });
    this.state = {
      experiment: props.data,
      targets,
      editingTarget: targets.light,
      datasets: [],
      isOpenEditingTarget: null
    };
  }

  toggleEditingTarget() {
    this.setState({
      isOpenEditingTarget: false
    });
  }

  handleTargetChange(event) {
    this.setState(prevState => ({
      isOpenEditingTarget: prevState.isOpenEditingTarget || event.typez === this.Events.change.typez
    }));
    this.handleInputChange(event);
  }

  handleAlgorithmsChange() {
    const { targets } = this.state;
    this.cacheValue('targets', targets);
    this.forceUpdate();
  }

  getGuidingMessageByTarget(/* target */) {
    // const targetProp = target.labels[0];
    // if (targetProp) {

    // }
    return 'Khi nào cần bật đèn quang hợp?';
  }

  generateTestFromTarget(target) {
    const {
      algorithms, optimizers = [], losses = [], activations = []
    } = target || {};
    const tests = [];
    if (algorithms && optimizers && losses && activations) {
      optimizers.forEach((optimizer) => {
        losses.forEach((loss) => {
          activations.forEach((activation) => {
            tests.push({
              optimizer,
              loss,
              activation
            });
          });
        });
      });
    }
    return tests;
  }

  render() {
    const {
      experiment, targets,
      editingTarget, isOpenEditingTarget,
      datasets
    } = this.state || {};
    const showEditingTarget = editingTarget != null && isOpenEditingTarget;

    return (
      <React.Fragment>
        <Section>
          <SectionHeader>Thông tin</SectionHeader>
          <SectionBody>
            <ExperimentBaseInfo experiment={experiment} />
          </SectionBody>
        </Section>
        <Section title="Huấn luyện chăm sóc tự động" beautyFont>
          <SectionBody className="mt-4">
            <ExperimentTargetsComp
              targets={targets}
              editingTarget={editingTarget}
              onChange={this.handleTargetChange}
              onSelect={this.handleTargetChange}
            />
          </SectionBody>
        </Section>

        <MDBCollapse isOpen={showEditingTarget}>
          <Section className="mt-4" title="Bạn muốn cây của bạn sẽ được chăm sóc như thế nào?" beautyFont>
            <div className="text-right">
              <MDBBtn
                className="px-2 py-1"
                onClick={this.toggleEditingTarget}
              ><i className="fas fa-minus-square" /> thu gọn
              </MDBBtn>
            </div>
            <h3 className="text-green text-center mt-3">{editingTarget && editingTarget.name}</h3>
          </Section>

          <Section>
            <SectionHeader>{this.getGuidingMessageByTarget(editingTarget)}</SectionHeader>
            <SectionBody>
              <Row>
                <Col size="3">
                  <div className="font-italic border-bottom mb-2">Dữ liệu thu thập được</div>
                  {showEditingTarget && (
                    <DatasetsSelect
                      datasets={datasets}
                      onChange={this.handleInputChange}
                    />
                  )}
                </Col>
                <Col size="6" className="arrow-right">
                  <div className="font-italic border-bottom mb-2">Yếu tố tác động</div>
                  <FeaturesSelect />
                </Col>
                <Col size="3" className="">
                  <div className="font-italic border-bottom mb-2">Yếu tố mục tiêu</div>
                  <OutputsSelect />
                </Col>
              </Row>
            </SectionBody>
          </Section>

          <Section>
            <SectionHeader>
              Thiết kế thuật toán... <small>nhưng không cần tính toán /=)</small>
            </SectionHeader>
            <SectionBody>
              <Row className="mt-3">
                <Col size="5">
                  {showEditingTarget && (
                    <AlgorithmsSelect
                      editingTarget={editingTarget}
                      onChange={this.handleAlgorithmsChange}
                    />
                  )}
                </Col>
                <Col size="7">
                  <AlgorithmTests target={editingTarget} />
                </Col>
              </Row>
            </SectionBody>
          </Section>
        </MDBCollapse>

        <Section title="Bắt Đầu Huấn Luyện" beautyFont>
          <TrainingSection
            experiment={experiment}
            editingTarget={editingTarget}
            targets={targets}
            datasets={datasets}
          />
        </Section>

        <Section title="Thử nghiệm model đã qua huấn luyện" beautyFont className="mb-4">
          <PredictSection
            editingTarget={editingTarget}
          />
        </Section>
      </React.Fragment>
    );
  }
}
