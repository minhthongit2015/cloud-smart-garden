import React, { memo } from 'react';
import StationPlant from './StationPlant';
import './NewUserPlantCard.scss';
import AnyDialogHelper from '../../../helpers/dialogs/any-dialog/AnyDialogHelper';
import WavesWrapper from '../../../components/utils/waves-wrapper/WavesWrapper';


export default memo(({
  className, station, onNewPlantAdded, ...restProps
}) => {
  function handleCreate() {
    AnyDialogHelper.open(AnyDialogHelper.Types.addNewPlant, station, onNewPlantAdded);
  }

  return (
    <StationPlant>
      <WavesWrapper className="cover">
        <div
          className={`new-user-plant-card cover center-content flex-column border rounded cursor-pointer ${className || ''}`}
          {...restProps}
          onClick={handleCreate}
        >
          <img
            src="/icons/garden/plants/aloe-vera.svg"
            alt="Add New Plant"
            className="w-50"
            style={{ marginTop: '15%' }}
          />
          <img
            src="/icons/util/plus.svg"
            alt="Add"
            className="w-25"
            style={{ marginTop: '5%' }}
          />
          <span
            className="link py-1 text-light hover-blue-green small mt-2"
          >Thêm Cây Mới
          </span>
        </div>
      </WavesWrapper>
    </StationPlant>
  );
});
