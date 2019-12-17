import React from 'react';
import { MDBInputGroup } from 'mdbreact';

export default React.memo((props) => {
  const {
    onClickRecommend, onClickZoom, value, onChange, ...restProps
  } = props;
  return (
    <MDBInputGroup
      material
      inputs={(
        <input
          className="form-control"
          placeholder="Độ thu phóng"
          name="zoom"
          type="number"
          min="0"
          step="1"
          max="20"
          value={value || ''}
          onChange={onChange}
          autoComplete="off"
          autofill="off"
        />
      )}
      append={(
        <div>
          {window.map && (
            <div
              className="btn btn-lg px-3 py-1 shadow-sm winter-neva-gradient text-white"
              title="Độ thu phóng hiện tại"
              onClick={onClickRecommend}
            >{window.map.getZoom()}
            </div>
          )}
          <div
            className="btn btn-sm px-3 py-2 shadow-sm winter-neva-gradient text-white"
            data-zoom={props.value}
            onClick={onClickZoom}
          >
            <i className="fas fa-search-plus" /> Zoom
          </div>
        </div>
      )}
      {...restProps}
    />
  );
});
