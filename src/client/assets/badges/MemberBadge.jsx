import React from 'react';
import './MemberBadge.scss';
import { MemberBadge } from '../../../server/utils/Constants';

const badgeMap = {
  Leader: <i className="fab fa-jedi-order" />,
  Administrator: <i className="fas fa-user-shield" />,
  Inventor: <i className="fas fa-rocket" />,
  Scientist: <i className="fas fa-atom" />,
  Biologist: <i className="fas fa-microscope" />,
  Botanist: <i className="fas fa-seedling" />,
  Developer: <i className="fas fa-laptop-code" />,
  ElectricalEngineer: <i className="fas fa-tools" />,
  MechanicalEngineer: <i className="fas fa-microchip" />
};

export default ({ badges, lighter }) => (
  badges ? (
    <span>
      {badges.map(badge => (
        <span
          key={badge}
          className={`member-badge mx-1 ${lighter ? 'lighter' : ''}`}
          title={MemberBadge[badge]}
        >
          {badgeMap[badge]}
        </span>
      ))}
    </span>
  ) : null
);
