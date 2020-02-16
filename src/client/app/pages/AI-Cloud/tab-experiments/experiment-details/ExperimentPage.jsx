/* eslint-disable class-methods-use-this */
import React from 'react';
import {
  Row, Col, MDBCollapse, MDBBtn
} from 'mdbreact';
import { Section, SectionHeader, SectionBody } from '../../../../layouts/base/section';
import { ExperimentTargets } from '../../../../utils/Constants';
import { generateTests, updateArray, findByKey } from '../../../../utils';
import ExperimentBaseInfo from './info-section/ExperimentBaseInfo';
import BaseComponent from '../../../../components/_base/BaseComponent';
import AlgorithmsSelect from './algorithms-section/AlgorithmsSelect';
import DatasetsSelect from './algorithms-section/DatasetsSelect';
import AlgorithmTests from './algorithms-section/AlgorithmTests';
import ExperimentTargetsComp from './targets-section/ExperimentTargets';
import FeaturesSelect from './algorithms-section/FeaturesSelect';
import OutputsSelect from './algorithms-section/OutputsSelect';
import TrainingSection from './training-section/TrainingSection';
import EvaluationSection from './evaluation-section/EvaluationSection';
import NewTrainedModel from '../../tab-trained-models/trained-models-page/NewTrainedModel';
import RouteConstants from '../../../../utils/RouteConstants';


export default class extends BaseComponent {
  constructor(props) {
    super(props);
    this.evaluationSectionRef = React.createRef();
    this.newTrainedModelRef = React.createRef();
    this.bind(
      this.handleTargetChange, this.toggleEditingTarget,
      this.handleAlgorithmsChange,
      this.handleTrainEnd,
      this.toggleEvaluationSection,
      this.handleSaveModel
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
      isOpenEvaluationSection: true
    };
  }

  componentDidMount() {
    this.evaluationSectionRef.current.compare();
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
    this.handleInputChange(event).then(() => {
      this.evaluationSectionRef.current.compare();
    });
  }

  toggleEditingTarget() {
    this.setState({
      isOpenEditingTarget: false
    });
  }

  toggleEvaluationSection() {
    this.setState(prevState => ({
      isOpenEvaluationSection: !prevState.isOpenEvaluationSection
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
    this.evaluationSectionRef.current.compare();
  }

  handleSaveModel() {
    this.newTrainedModelRef.current.setFormData({
      title: 'Model 01'
    });
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
      isOpenEvaluationSection
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
              onClick={this.toggleEvaluationSection}
            ><i className="fas fa-minus-square" /> {isOpenEvaluationSection ? 'Thu gọn' : 'Mở rộng'}
            </MDBBtn>
          </div>
          <MDBCollapse isOpen={isOpenEvaluationSection}>
            <EvaluationSection
              ref={this.evaluationSectionRef}
              experiment={experiment}
              editingTarget={editingTarget}
            />
          </MDBCollapse>
        </Section>

        <Section title="Lưu Model đã qua huấn luyện" beautyFont className="mb-4">
          <Row className="mb-3">
            <Col size="6" sm="4" className="text-center offset-0 offset-sm-4">
              <MDBBtn
                className="px-3 py-2"
                onClick={this.handleSaveModel}
              >Lưu Model
              </MDBBtn>
            </Col>
            <Col size="6" sm="4" className="d-flex align-items-start justify-content-end">
              <a
                className="hover-blue grey-text"
                href={RouteConstants.aiTrainedModelsLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Trained Models <i className="fas fa-external-link-square-alt" />
              </a>
            </Col>
          </Row>
          <NewTrainedModel
            ref={this.newTrainedModelRef}
            hasPermission
          />
        </Section>
      </React.Fragment>
    );
  }
}
