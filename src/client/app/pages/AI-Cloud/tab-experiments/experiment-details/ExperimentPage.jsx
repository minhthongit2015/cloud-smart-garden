/* eslint-disable class-methods-use-this */
import React from 'react';
import {
  Row, Col, MDBCollapse, MDBBtn
} from 'mdbreact';
import { Section, SectionHeader, SectionBody } from '../../../../layouts/base/section';
import { ExperimentTargets } from '../../../../utils/Constants';
import { generateTests, updateArray, findByKey } from '../../../../utils';
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
    this.predictSectionRef = React.createRef();
    this.bind(
      this.handleTargetChange, this.toggleEditingTarget,
      this.handleAlgorithmsChange,
      this.handleTrainEnd,
      this.togglePredictSection
    );

    const targets = this.getCachedValue('targets', { ...ExperimentTargets });
    const editingTargetKey = this.getCachedValue('editingTargetKey', 'light');
    const editingTarget = findByKey(editingTargetKey, targets);
    this.state = {
      experiment: props.data,
      targets,
      editingTarget,
      datasets: editingTarget.datasets,
      isOpenEditingTarget: false,
      isOpenPredictSection: true
    };
  }

  handleTargetChange(event) {
    const { currentTarget: { value: editingTarget } } = event;
    if (!editingTarget.tests) {
      editingTarget.tests = generateTests(editingTarget);
    }
    this.setState(prevState => ({
      isOpenEditingTarget: prevState.isOpenEditingTarget || event.typez === this.Events.change.typez
    }));
    this.cacheValue('editingTargetKey', editingTarget.key);
    this.handleInputChange(event);
  }

  toggleEditingTarget() {
    this.setState({
      isOpenEditingTarget: false
    });
  }

  togglePredictSection() {
    this.setState(prevState => ({
      isOpenPredictSection: !prevState.isOpenPredictSection
    }));
  }

  handleAlgorithmsChange() {
    const { targets, editingTarget } = this.state;
    if (!editingTarget.tests) {
      editingTarget.tests = generateTests(editingTarget);
    } else {
      const newTests = generateTests(editingTarget);
      const oldTests = editingTarget.tests;
      editingTarget.tests = updateArray(oldTests, newTests);
    }
    this.cacheValue('targets', targets);
    this.forceUpdate();
  }

  handleTrainEnd() {
    this.predictSectionRef.current.compare();
  }

  getGuidingMessageByTarget(/* target */) {
    // const targetProp = target.labels[0];
    // if (targetProp) {

    // }
    return 'Khi nào cần bật đèn quang hợp?';
  }

  render() {
    const {
      experiment, targets,
      editingTarget, isOpenEditingTarget,
      isOpenPredictSection
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
                <Col sm="12" md="3">
                  <div className="font-italic border-bottom mb-2">Dữ liệu thu thập được</div>
                  {showEditingTarget && (
                    <DatasetsSelect
                      editingTarget={editingTarget}
                      onChange={this.handleAlgorithmsChange}
                    />
                  )}
                </Col>
                <Col sm="8" md="6" className="arrow-right">
                  <div className="font-italic border-bottom mb-2">Yếu tố tác động</div>
                  <FeaturesSelect />
                </Col>
                <Col sm="4" md="3" className="">
                  <div className="font-italic border-bottom mb-2">Yếu tố mục tiêu</div>
                  <OutputsSelect />
                </Col>
              </Row>
            </SectionBody>
          </Section>

          <Section>
            <SectionHeader>
              Thiết kế huấn luyện
            </SectionHeader>
            <SectionBody>
              <Row className="mt-3">
                <Col sm="12" md="5">
                  {showEditingTarget && (
                    <AlgorithmsSelect
                      editingTarget={editingTarget}
                      onChange={this.handleAlgorithmsChange}
                    />
                  )}
                </Col>
                <Col sm="12" md="7">
                  <AlgorithmTests
                    editingTarget={editingTarget}
                    onChange={this.handleAlgorithmsChange}
                  />
                </Col>
              </Row>
            </SectionBody>
          </Section>
        </MDBCollapse>

        <Section title={editingTarget ? editingTarget.name : 'Bắt Đầu Huấn Luyện'} beautyFont>
          <TrainingSection
            experiment={experiment}
            editingTarget={editingTarget}
            targets={targets}
            onEnd={this.handleTrainEnd}
          />
        </Section>

        <Section title="Thử nghiệm model đã qua huấn luyện" beautyFont className="mb-4">
          <div className="text-right">
            <MDBBtn
              className="px-2 py-1"
              onClick={this.togglePredictSection}
            ><i className="fas fa-minus-square" /> {isOpenPredictSection ? 'Thu gọn' : 'Mở rộng'}
            </MDBBtn>
          </div>
          <MDBCollapse isOpen={isOpenPredictSection}>
            <PredictSection
              ref={this.predictSectionRef}
              experiment={experiment}
              editingTarget={editingTarget}
            />
          </MDBCollapse>
        </Section>
      </React.Fragment>
    );
  }
}
