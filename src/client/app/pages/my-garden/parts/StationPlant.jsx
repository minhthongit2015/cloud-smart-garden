import React, { memo, useState, useRef } from 'react';
import {
  MDBCollapse, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from 'mdbreact';
import RatioRect from '../../../components/utils/ratio-rect/RatioRect';
import WavesWrapper from '../../../components/utils/waves-wrapper/WavesWrapper';
import UserPlantService from '../../../services/garden/UserPlantService';


export default memo(({
  userPlantId, stationId, plant, children, onPlantRemoved
}) => {
  const [isHovering, setHovering] = useState();
  const dropdownRef = useRef();

  function toggleShowDetails() {
    setHovering(false);
    dropdownRef.current.toggle();
  }

  function handleHover() {
    setHovering(true);
  }

  function handleLeave() {
    setHovering(false);
  }

  function handleRemovePlant() {
    UserPlantService.removeUserPlant(userPlantId, stationId)
      .then((rs) => {
        onPlantRemoved(rs.data);
      });
  }

  return (
    <RatioRect className="overlapable p-2 w-lg-7 w-md-5 w-sm-3 w-2 blend-light-wrapper" ratio={4 / 7}>
      {plant ? (
        <React.Fragment>
          <WavesWrapper className="cover rounded">
            <img src={plant.previewPhoto} alt={plant.title} className={`cover ${isHovering ? 'img' : ''}`} />
          </WavesWrapper>
          <div className="overlap bottom auto-size ml-1 mb-1 text-white">{plant.title}</div>
          <div
            className="overlap right auto-size mr-1 mt-1 text-white small"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            <MDBCollapse isOpen={isHovering}>
              <div className="p-2 blend-light">
                <div><b>35 ngày tuổi</b></div>
                <div>Sức khỏe: Tốt</div>
                <div>Thu hoạch: 29/5</div>
                <div>Dòng: Quý Hiếm</div>
              </div>
            </MDBCollapse>
            <div
              onClick={toggleShowDetails}
              className="overlap right auto-size mr-0 mt-0 text-white cursor-pointer"
            >
              <i className="far fa-dot-circle" />
            </div>
            <div className="overlap right auto-size mr-0 mt-2 text-white cursor-pointer">
              <MDBDropdown className="position-static" ref={dropdownRef} dropleft>
                <MDBDropdownToggle className="context-menu__red-dot w-0 h-0 p-0 m-0" />
                <MDBDropdownMenu>
                  <MDBDropdownItem onClick={handleRemovePlant}>Gỡ bỏ cây</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </div>
          </div>
        </React.Fragment>
      ) : (
        children
      )}
    </RatioRect>
  );
});
