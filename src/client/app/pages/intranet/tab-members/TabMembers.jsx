import React from 'react';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import t from '../../../languages';
import DeepMessage from '../../../components/utils/messages/DeepMessage';
import AdminPage from '../../_base/AdminPage';
import superrequest from '../../../utils/superrequest';
import ApiEndpoints from '../../../utils/ApiEndpoints';
import MembersSpotlightChart from '../../../components/charts/intranet/MembersSpotlightChart';
import MemberList from './MemberList';
import MembersChartHelper from '../../../helpers/charts/MembersChartHelper';
import RatioRect from '../../../components/utils/ratio-rect/RatioRect';
import MemberKeysEditor from './MemberEditor';
import Random from '../../../utils/Random';


export default class extends AdminPage {
  constructor(props) {
    super(props, t('pages.intranet.title.memberSpotlight'));
    this.handleLeaveMember = this.handleLeaveMember.bind(this);
    this.handlePreviewMember = this.handlePreviewMember.bind(this);
    this.handleSelectMember = this.handleSelectMember.bind(this);
    this.handleMemberUpdated = this.handleMemberUpdated.bind(this);
    this.state = {
      selectedMembers: [],
      randomMember: null,
      hoveringMember: null,
      members: []
    };
  }

  componentDidMount() {
    super.componentDidMount();
    this.fetchMembers();
  }

  fetchMembers() {
    superrequest.get(`${ApiEndpoints.users}?where={"role":{"$in":["admin","moderator"]}}`)
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
      hoveringMember: member
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

  render() {
    const {
      members, selectedMembers, hoveringMember, randomMember
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

    return (
      <Section>
        <SectionHeader>
          <DeepMessage>{t('pages.intranet.message.memberSpotlight')}</DeepMessage>
        </SectionHeader>
        <SectionBody>
          <div className="d-flex">
            <div>
              <MemberList
                members={members}
                onSelect={this.handleSelectMember}
                onMouseEnter={this.handlePreviewMember}
                onMouseLeave={this.handleLeaveMember}
              />
            </div>
            <div className="flex-fill d-flex flex-column align-items-center mb-5" style={{ height: '300px' }}>
              <MemberKeysEditor
                member={editingMember}
                onSubmit={this.handleMemberUpdated}
                onChange={this.handleMemberUpdated}
              />
              <RatioRect ratio={6 / 3}>
                <MembersSpotlightChart
                  {...MembersChartHelper.buildProps(viewMembers)}
                />
              </RatioRect>
            </div>
          </div>
        </SectionBody>
      </Section>
    );
  }
}
