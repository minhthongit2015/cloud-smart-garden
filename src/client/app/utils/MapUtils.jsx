import DisasterMarker from '../components/map/disaster-marker/DisasterMarker';
import ActionMarker from '../components/map/action-marker/ActionMarker';
import ActivistMarker from '../components/map/activist-marker/ActivistMarker';
import ExtinctionMarker from '../components/map/extinction-marker/ExtinctionMarker';
import StrikeMarker from '../components/map/strike-marker/StrikeMarker';
import Polyline from '../components/map/polyline/Polyline';

export default class {
  static getMarkerByType(type) {
    switch (type) {
    case 'Disaster':
      return DisasterMarker;
    case 'Activist':
      return ActivistMarker;
    case 'Action':
      return ActionMarker;
    case 'Extinction':
      return ExtinctionMarker;
    case 'Strike':
      return StrikeMarker;
    case 'Path':
      return Polyline;
    default:
      return null;
    }
  }

  static getPathStyleByType(type) {
    return {
      color: this.getPathColorByType(type),
      icons: this.getPathIconsByType(type),
      width: this.getPathWidthByType(type)
    };
  }

  static getPathColorByType(type) {
    switch (type) {
    case 'Activist-Strike':
      return '#ff8949';
    case 'Strike':
      return '#ff4444';
    default:
      return '#00ffff';
    }
  }

  static getPathIconsByType(type) {
    const IconArrow = {
      icon: {
        path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        strokeOpacity: 1,
        scale: 2
      },
      offset: '100%'
    };
    const IconDashed = {
      icon: { path: 'M 0,-1 0,1', strokeOpacity: 1, scale: 2 },
      offset: '0',
      repeat: '10px'
    };
    const r = 2;
    const IconDot = {
      icon: {
        path: `M 0, 0 m -${r},0 a ${r},${r} 0 1,0 ${r * 2}, 0 a ${r},${r} 0 1,0 -${r * 2},0`,
        strokeOpacity: 1,
        fillColor: this.getPathColorByType(type),
        fillOpacity: 1,
        scale: 2
      },
      offset: '0'
    };
    switch (type) {
    case 'Activist-Strike':
      return [IconArrow, IconDashed];
    case 'Strike':
      return [IconArrow, IconDot];
    default:
      return [IconArrow];
    }
  }

  static getPathWidthByType(type) {
    switch (type) {
    case 'Activist-Strike':
      return 0;
    case 'Strike':
    default:
      return 2;
    }
  }
}
