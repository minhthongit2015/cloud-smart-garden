import React from 'react';
import BaseComponent from '../../../components/BaseComponent';
import './MemberList.scss';
import UISounds from '../../../../assets/sounds/UISounds';
import { getParameters } from '../../../../assets/icons/EffectHelper';
import MemberBadge from '../../../../assets/badges/MemberBadge';
import { IconAlphaTeam } from '../../../../assets/icons';


export default class extends BaseComponent {
  get selectedMembers() {
    const { hoveringMember, selectedMembers } = this.state;
    if (!hoveringMember || selectedMembers.find(member => member._id === hoveringMember._id)) {
      return selectedMembers;
    }
    return [...selectedMembers, hoveringMember];
  }

  getMemberClass(member) {
    const { selectedMembers } = this.state;
    let className = '';
    if (selectedMembers.find(memberi => memberi._id === member._id)) {
      className += 'selected';
    }
    return className;
  }

  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = {
      mx: 0,
      my: 0,
      selectedMembers: [],
      hoveringMember: null
    };
  }

  getMemberFromEvent(event) {
    const { currentTarget: { id } } = event;
    const { members } = this.props;
    return members && members.find(memberz => memberz._id === id);
  }

  handleSelect(event) {
    UISounds.playFuture1();
    const member = this.getMemberFromEvent(event);
    this.setState((prevState) => {
      const newSelectedMembers = [...prevState.selectedMembers];
      const foundIndex = newSelectedMembers.findIndex(
        focusedMember => focusedMember._id === member._id
      );
      if (foundIndex >= 0) {
        newSelectedMembers.splice(foundIndex, 1);
      } else {
        newSelectedMembers.push(member);
      }
      return {
        selectedMembers: newSelectedMembers
      };
    }, () => {
      this.dispatchEvent({ typez: 'select' }, this.selectedMembers, member);
    });
  }

  handleMouseEnter(event) {
    UISounds.playTock2();
    const member = this.getMemberFromEvent(event);
    this.setState(prevState => ({
      hoveringMember: this.getHoveringMember(prevState, member)
    }), () => {
      this.dispatchEvent({ typez: 'mouse enter' }, this.selectedMembers, member);
    });
  }

  handleMouseLeave(event) {
    UISounds.playTock2();
    const member = this.getMemberFromEvent(event);
    this.setState(prevState => ({
      hoveringMember: this.getHoveringMember(prevState, member)
    }), () => {
      this.dispatchEvent({ typez: 'mouse leave' }, this.selectedMembers, member);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getHoveringMember(prevState, member) {
    if (prevState.hoveringMember && prevState.hoveringMember._id === member._id) {
      return null;
    }
    return member;
  }

  handleMouseMove(event) {
    const { x, y } = getParameters(event, 0.45);
    this.setState({
      mx: x,
      my: y
    });
  }

  renderMember(member) {
    const { mx, my } = this.state;
    const background = `radial-gradient(circle at ${mx * 1.2}px ${my * 1.2}px, `
      + '#ff9494 0, rgba(255, 148, 148, .5) 70px, transparent 150px)';
    return (
      <div
        key={member._id}
        className="member-row-wrapper"
        style={{ background }}
        onMouseMove={this.handleMouseMove}
        id={member._id}
        onClick={this.handleSelect}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div
          className={`member-row ${this.getMemberClass(member)}`}
        >
          <div>
            {member.badges && <MemberBadge badges={[member.badges[0]]} />}
            {member.name}
          </div>
          {member.badges && member.badges.length > 1 && (
            <div><MemberBadge badges={member.badges} lighter /></div>
          )}
        </div>
      </div>
    );
  }

  render() {
    const {
      className, members, onSelect, onMouseEnter, onMouseLeave, ...restProps
    } = this.props;
    return (
      <div className={`member-list ${className || ''}`} {...restProps}>
        {members.map(member => this.renderMember(member))}
        <IconAlphaTeam className="member-list__icon" />
      </div>
    );
  }
}
