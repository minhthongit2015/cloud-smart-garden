import React from 'react';
import { Row, Col } from 'mdbreact';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import t from '../../../languages';
import DeepMessage from '../../../components/utils/messages/DeepMessage';
import StandalonePage from '../../_base/StandalonePage';
import superrequest from '../../../utils/superrequest';
import ApiEndpoints from '../../../utils/ApiEndpoints';
import MembersSpotlightChart from '../../../components/charts/intranet/MembersSpotlightChart';
import MemberList from './MemberList';
import MembersChartHelper from '../../../helpers/charts/MembersChartHelper';
import RatioRect from '../../../components/utils/ratio-rect/RatioRect';
import MemberKeysEditor from './MemberEditor';
import Random from '../../../utils/Random';
import MembersMarksChart from '../../../components/charts/intranet/MembersMarksChart';


export default class extends StandalonePage {
  constructor(props) {
    super(props, t('pages.intranet.title.memberSpotlight'));
    this.handleLeaveMember = this.handleLeaveMember.bind(this);
    this.handlePreviewMember = this.handlePreviewMember.bind(this);
    this.handleSelectMember = this.handleSelectMember.bind(this);
    this.handleMemberUpdated = this.handleMemberUpdated.bind(this);
    this.handleViewTarget = this.handleViewTarget.bind(this);
    this.handleViewPresent = this.handleViewPresent.bind(this);
    this.handleMarkCreated = this.handleMarkCreated.bind(this);

    this.state = {
      selectedMembers: [],
      randomMember: null,
      hoveringMember: null,
      isViewTarget: false,
      isForceViewTarget: false,
      members: []
    };
  }

  componentDidMount() {
    super.componentDidMount();
    this.fetchMembers();
  }

  fetchMembers() {
    superrequest.get(ApiEndpoints.members)
      .then((res) => {
        this.setState({
          members: res.data,
          randomMember: Random.random(res.data)
        });
      });
  }

  handlePreviewMember(event, members, member) {
    this.setState({
      selectedMembers: members,
      hoveringMember: member,
      isForceViewTarget: window.key.alt || (event && event.altKey)
    });
  }

  handleLeaveMember(event, members) {
    this.setState({
      selectedMembers: members,
      hoveringMember: null
    });
  }

  handleSelectMember(event, members) {
    this.setState({
      selectedMembers: members,
      randomMember: null
    });
  }

  handleMemberUpdated() {
    this.forceUpdate();
  }

  handleViewTarget() {
    this.setState({
      isViewTarget: true
    });
  }

  handleViewPresent() {
    this.setState({
      isViewTarget: false
    });
  }

  handleMarkCreated(event, member) {
    const { members } = this.state;
    const foundMember = members.find(memberz => memberz._id === member._id);
    if (foundMember) {
      foundMember.marks = member.marks;
    }
  }

  render() {
    const {
      members, selectedMembers, hoveringMember, randomMember, isViewTarget, isForceViewTarget
    } = this.state;

    const isNotSelectAnyMember = selectedMembers.length <= 0;

    const editingMember = hoveringMember
      || (isNotSelectAnyMember
        ? randomMember
        : selectedMembers[selectedMembers.length - 1]);

    const viewMembers = [...selectedMembers];
    if (isNotSelectAnyMember && editingMember) {
      viewMembers.push(editingMember);
    }

    if ((isViewTarget || isForceViewTarget) && editingMember) {
      viewMembers.push({
        name: `${editingMember.name} (mục tiêu)`,
        spotlight: editingMember.target
      });
    }

    return (
      <Section>
        <SectionHeader>
          <DeepMessage>{t('pages.intranet.message.memberSpotlight')}</DeepMessage>
        </SectionHeader>
        <SectionBody>
          <Row className="flex-lg-nowrap">
            <Col size="auto" className="pr-0">
              <MemberList
                className="mb-4"
                members={members}
                onSelect={this.handleSelectMember}
                onMouseEnter={this.handlePreviewMember}
                onMouseLeave={this.handleLeaveMember}
              />
            </Col>
            <Col sm="12" className="flex-lg-fill pl-0">
              <div className="flex-fill d-flex flex-column align-items-center mb-5">
                <MemberKeysEditor
                  member={editingMember}
                  onSubmit={this.handleMemberUpdated}
                  onChange={this.handleMemberUpdated}
                  onViewTarget={this.handleViewTarget}
                  onViewPresent={this.handleViewPresent}
                  onCreateMark={this.handleMarkCreated}
                  isViewTarget={isViewTarget}
                />
                <RatioRect ratio={6 / 3} fluid>
                  <MembersSpotlightChart
                    {...MembersChartHelper.buildProps(viewMembers)}
                  />
                  <MembersMarksChart
                    {...MembersChartHelper.buildMemberMarksProps(editingMember)}
                  />
                </RatioRect>
              </div>
            </Col>
          </Row>
        </SectionBody>
      </Section>
    );
  }
}
