/* eslint-disable class-methods-use-this */
import FloatingPanel from './FloatingPanel';


export default class RightFloatingPanel extends FloatingPanel {
  get width() {
    return this.props.width || '300px';
  }

  get height() {
    return this.props.height || 'calc(100% - 34px)';
  }

  get top() { return this.props.top || '10px'; }

  get right() { return this.props.right || '60px'; }
}
