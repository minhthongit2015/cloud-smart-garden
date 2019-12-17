import React from 'react';
import './ZoomTool.scss';

const levels = {
  default: { label: 'Mặc định', value: '', icon: 'fas fa-search-plus' },
  human: { label: 'Thu phóng mức Sinh vật', value: 20, icon: 'fas fa-dog' },
  house: { label: 'Thu phóng mức Nhà cửa', value: 17, icon: 'fas fa-home' },
  district: { label: 'Thu phóng mức Quận', value: 15, icon: 'fas fa-building' },
  city: { label: 'Thu phóng mức Thành phố', value: 12, icon: 'fas fa-city' },
  country: { label: 'Thu phóng mức Quốc gia', value: 6, icon: 'fas fa-flag' },
  region: { label: 'Thu phóng mức Khu vực', value: 4, icon: 'fas fa-map-marked-alt' },
  world: { label: 'Thu phóng mức Thế giới', value: 2, icon: 'fas fa-globe-asia' }
};

export default class ZoomTool extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleZoomTo = this.handleZoomTo.bind(this);
  }

  handleZoomTo(event) {
    const { zoomTo } = this.props;
    const zoomLevel = event.currentTarget.dataset.zoom;
    zoomTo(zoomLevel && +zoomLevel);
  }

  // eslint-disable-next-line class-methods-use-this
  isActive(level, mapZoomLevel, isCustom) {
    return !isCustom
      ? level.value === mapZoomLevel
      : level.value === '';
  }

  render() {
    const { zoomTo, zoom, ...restProps } = this.props;
    const mapZoomLevel = window.map.getZoom();
    const isCustom = Object.values(levels).every(level => level.value !== mapZoomLevel);

    return (
      <div className="zoom-tool">
        {Object.values(levels).map(level => (
          <div
            key={level.value}
            className={`zoom-tool__option ${this.isActive(level, mapZoomLevel, isCustom) ? 'active' : ''}`}
            title={`${level.label}${((level.value || zoom) && ` (${level.value || zoom})`) || ''}`}
            data-zoom={level.value || zoom}
            onClick={this.handleZoomTo}
            {...restProps}
          >
            <i className={level.icon} />
          </div>
        ))}
      </div>
    );
  }
}
