/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
import React from 'react';
import {
  Row, Col, MDBBtn
} from 'mdbreact';
import Select from 'react-select';
import { debounce } from 'debounce';
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
import ExperimentService from '../../../../services/AI/ExperimentService';
import t from '../../../../languages';
import LanguagesHelper, { tAI } from './LanguagesHelper';


export default class ExperimentPage extends BaseComponent {
  get showEditingTarget() {
    return this.algorithmSectionRef.current && this.algorithmSectionRef.current.isOpen;
  }

  constructor(props) {
    super(props);
    this.evaluationSectionRef = React.createRef();
    this.newTrainedModelRef = React.createRef();
    this.algorithmSectionRef = React.createRef();
    this.guidingSectionRef = React.createRef();
    this.bind(
      this.handleTargetChange,
      this.handleAlgorithmsChange,
      this.handleTrainEnd,
      this.handleSaveModel,
      this.handleOverrideModel,
      this.handleLanguageChange,
      this.handleAlgorithmSectionOpened,
      this.handleOpenGuidingSection
    );
    this.executeEvaluation = debounce(this.executeEvaluation.bind(this), 2000);

    const targets = this.getCachedValue('targets', { ...ExperimentTargets });
    const editingTargetKey = this.getCachedValue('editingTargetKey', 'light');
    const editingTarget = findByKey(editingTargetKey, targets);
    this.state = {
      experiment: props.data,
      targets,
      editingTarget,
      datasets: editingTarget.datasets
    };

    LanguagesHelper.useAILanguage(this);
  }

  componentDidMount() {
    this.executeEvaluation();
  }

  componentWillUnmount() {
    this.executeEvaluation.clear();
  }

  handleLanguageChange(option) {
    LanguagesHelper.setAILanguage(option.value);
  }

  handleOpenGuidingSection() {
    this.guidingSectionRef.current.toggle();
  }

  handleTargetChange(event) {
    const { currentTarget: { value: editingTarget } } = event;
    if (!editingTarget.tests) {
      editingTarget.tests = generateTests(editingTarget);
    }
    if (event.typez === 'change') {
      if (this.state.editingTarget !== editingTarget) {
        this.algorithmSectionRef.current.open();
      } else {
        this.algorithmSectionRef.current.toggle();
      }
    }
    this.cacheValue('editingTargetKey', editingTarget.key);
    this.handleInputChange(event).then(this.executeEvaluation);
  }

  handleAlgorithmSectionOpened() {
    this.forceUpdate();
  }

  executeEvaluation() {
    this.evaluationSectionRef.current.compare();
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
    this.executeEvaluation();
  }

  handleSaveModel() {
    const { experiment, editingTarget } = this.state;
    this.newTrainedModelRef.current.setFormData({
      title: `${experiment.title} - ${editingTarget.name}`,
      experiment,
      target: editingTarget,
      previewPhoto: experiment.previewPhoto
    });
  }

  handleOverrideModel() {
    const { experiment, editingTarget } = this.state;
    ExperimentService.overrideModel(experiment._id, editingTarget.key)
      .then(() => {
        alert('Cập nhập hoàn tất!');
      });
  }

  getGuidingMessageByTarget(target) {
    const firstLabel = target.labels[0];
    const firstNode = firstLabel && firstLabel[0];
    if (!firstNode) return 'Xác định yếu tố tác động';

    const key = ExperimentPage.getNodeKey(firstNode);
    const label = ExperimentPage.getNodeLabel(firstNode);
    if (firstNode && ExperimentPage.guessingTypeByLabel(key) === Boolean) {
      return `Khi nào cần bật ${label}?`;
    }
    return `Bao nhiêu ${label} là phù hợp?`;
  }

  static guessingTypeByLabel(label) {
    const boolLabels = ['led', 'pump', 'fan', 'misting'];
    if (boolLabels.find(boolLabel => label.includes(boolLabel))) {
      return Boolean;
    }
    return Number;
  }

  static getNodeKey(node) {
    return typeof node === 'string' ? node : node.key;
  }

  static getNodeLabel(node) {
    return typeof node === 'string'
      ? t(`features.${node.split('.').slice(-1)[0]}`)
      : node.name;
  }

  render() {
    const {
      experiment, targets,
      editingTarget
    } = this.state || {};
    const languages = Object.entries(LanguagesHelper.AILanguages)
      .map(([key, name]) => ({ label: name, value: key }));
    const currentLanguage = LanguagesHelper.getAILanguage();
    const currentLanguageOption = findByKey(currentLanguage, languages, null, 'value');

    return (
      <React.Fragment>
        <Section>
          <SectionHeader className="d-flex justify-content-between">
            <div>Thông tin</div>
            <div className="d-flex align-items-center">
              <MDBBtn
                onClick={this.handleOpenGuidingSection}
                color="none"
                className="px-2 py-1 mr-2 text-nowrap grey-text text-normal hover-green"
              ><i className="fas fa-info-circle" /> Xem Hướng Dẫn
              </MDBBtn>
              <div style={{ width: '150px' }}>
                <Select
                  placeholder="Chọn ngôn ngữ"
                  options={languages}
                  className="w-100 small"
                  value={currentLanguageOption}
                  onChange={this.handleLanguageChange}
                />
              </div>
            </div>
          </SectionHeader>
          <SectionBody>
            <ExperimentBaseInfo experiment={experiment} />
          </SectionBody>
        </Section>

        <Section
          ref={this.guidingSectionRef}
          title="Hướng dẫn"
          className="mt-4"
          beautyFont
          togglable
          collapseAll
        >
          <p>Đây là hướng dẫn để tạo ra chế độ chăm sóc tự động cho cây trồng. Bạn sẽ cần đào tạo ra 4 học sinh chuyên ở 4 lĩnh vực để có thể chăm sóc toàn diện 4 yếu tố cho cây (dinh dưỡng, ánh sáng, nhiệt độ, độ ẩm).</p>
          <div className="d-flex">
            <div className="flex-1">
              <div><b>Hướng dẫn 01 - Các bước</b></div>
              <ol>
                <li>Chọn nhánh học sinh</li>
                <li>Tùy chỉnh học sinh/Trường học</li>
                <li>Đào tạo học sinh</li>
                <li>Xét tốt nghiệp cho học sinh</li>
              </ol>
            </div>
            <div className="flex-1">
              <div><b>Hướng dẫn 02 - Hướng dẫn thêm</b></div>
              <ol>
                <li>Việc xét tốt nghiệp hoàn toàn phụ thuộc vào bạn. Hãy quan sát điểm số của sinh viên và xét tốt nghiệp nếu bạn hài lòng với điểm số đó.</li>
              </ol>
            </div>
          </div>
        </Section>

        <Section title={tAI('targetsTitle')} beautyFont>
          <SectionBody className="mt-4">
            <ExperimentTargetsComp
              targets={targets}
              editingTarget={editingTarget}
              onChange={this.handleTargetChange}
              onSelect={this.handleTargetChange}
            />
          </SectionBody>
        </Section>

        <Section
          ref={this.algorithmSectionRef}
          className="mt-4"
          title={tAI('algorithmSection')}
          beautyFont
          togglable
          collapseAll
          onOpen={this.handleAlgorithmSectionOpened}
        >
          <h3 className="text-green text-center mt-3">{editingTarget && editingTarget.name}</h3>
          <SectionHeader>{this.getGuidingMessageByTarget(editingTarget)}</SectionHeader>
          <SectionBody>
            <Row>
              <Col sm="12" md="3">
                <div className="font-italic border-bottom mb-2">Dữ liệu thu thập được</div>
                {this.showEditingTarget && (
                  <DatasetsSelect
                    editingTarget={editingTarget}
                    onChange={this.handleAlgorithmsChange}
                  />
                )}
              </Col>
              <Col sm="8" md="6" className="arrow-right">
                <div className="font-italic border-bottom mb-2">Yếu tố tác động</div>
                <FeaturesSelect editingTarget={editingTarget} />
              </Col>
              <Col sm="4" md="3" className="">
                <div className="font-italic border-bottom mb-2">Yếu tố mục tiêu</div>
                <OutputsSelect editingTarget={editingTarget} />
              </Col>
            </Row>
          </SectionBody>

          <SectionHeader className="mt-3">
            Thiết kế huấn luyện
          </SectionHeader>
          <SectionBody>
            <Row className="mt-3">
              <Col sm="12" md="6">
                {this.showEditingTarget && (
                  <AlgorithmsSelect
                    editingTarget={editingTarget}
                    onChange={this.handleAlgorithmsChange}
                  />
                )}
              </Col>
              <Col sm="12" md="6">
                <AlgorithmTests
                  editingTarget={editingTarget}
                  onChange={this.handleAlgorithmsChange}
                />
              </Col>
            </Row>
          </SectionBody>
        </Section>

        <Section title={`Huấn luyện ${tAI('targets', editingTarget.key)}`} beautyFont>
          <TrainingSection
            experiment={experiment}
            editingTarget={editingTarget}
            targets={targets}
            onEnd={this.handleTrainEnd}
          />
        </Section>

        <Section title={tAI('evaluationSection')} beautyFont className="mb-4" togglable>
          <EvaluationSection
            ref={this.evaluationSectionRef}
            experiment={experiment}
            editingTarget={editingTarget}
          />
        </Section>

        <Section title={tAI('saveModelTitle')} beautyFont className="mb-4">
          <Row className="mb-3">
            <Col size="12" sm="6" className="text-center offset-0 offset-sm-3">
              <MDBBtn
                className="px-3 py-2"
                onClick={this.handleSaveModel}
              ><i className="fas fa-cloud-download-alt" /> {tAI('saveModel')}
              </MDBBtn>
              <MDBBtn
                className="px-3 py-2"
                onClick={this.handleOverrideModel}
              ><i className="fas fa-sync-alt" /> {tAI('overrideModel')}
              </MDBBtn>
            </Col>
            <Col size="12" sm="3" className="d-flex align-items-start justify-content-end">
              <a
                className="hover-blue grey-text"
                href={RouteConstants.aiTrainedModelsLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {tAI('trainedModels')} <i className="fas fa-external-link-square-alt" />
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
