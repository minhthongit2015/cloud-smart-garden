/* eslint-disable class-methods-use-this */
import FloatingListPanel from './FloatingListPanel';


export default class RightFloatingPanel extends FloatingListPanel {
  get width() {
    return this.props.width || '300px';
  }

  get height() {
    return this.props.height || 'calc(100% - 34px)';
  }

  get top() { return this.props.top || '10px'; }

  get right() { return this.props.right || '60px'; }
}
