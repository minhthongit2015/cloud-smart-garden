import PropTypes from 'prop-types';
import DisasterMarker from '../disaster-marker/DisasterMarker';
import { DinosaurSrc } from '../../../../assets/icons';
import './ExtinctionMarker.scss';

export default class ExtinctionMarker extends DisasterMarker {
  static get customClass() {
    return 'extinction';
  }
}

ExtinctionMarker.propTypes = {
  iconSrc: PropTypes.string,
  entity: PropTypes.object
};

ExtinctionMarker.defaultProps = {
  iconSrc: DinosaurSrc,
  entity: {}
};
