import React, { memo } from 'react';
import StationPlant from './StationPlant';
import NewUserPlantCard from './NewUserPlantCard';
import './GardenStation.scss';
import SyncService from '../../../services/sync/SyncService';
import superrequest from '../../../utils/superrequest';
import ApiEndpoints from '../../../utils/ApiEndpoints';
import StationService from '../../../services/garden/StationService';

function useForceUpdate() {
  const [, setValue] = React.useState(0); // integer state
  return () => setValue(valuez => ++valuez); // update the state to force render
}

export default memo(({ station, onNewPlantAdded, onPlantRemoved }) => {
  const [ledState, setLedState] = React.useState(null);
  const [lastToggleLed, setLastToggleLed] = React.useState(0);
  const [latestRecord, setLatestRecord] = React.useState({});

  const forceUpdate = useForceUpdate();
  SyncService.useEvent(`stateChange-${station._id}`, (record) => {
    setLatestRecord(record);
    if (ledState == null
      || station.automated
      || Date.now() - lastToggleLed > 2000) {
      setLedState(record.state.led);
    }
  });
  const {
    state: {
      temperature = 0,
      humidity = 0,
      light = 0
      // led = false
    } = {}
  } = latestRecord;
  function handleToggleLed() {
    superrequest.post(ApiEndpoints.setStationStateI(station._id), { led: !ledState });
    setLedState(!ledState);
    setLastToggleLed(Date.now());
  }
  function handleToggleAutomated() {
    station.automated = !station.automated;
    StationService.update(station);
    forceUpdate();
  }

  return (
    <div className="garden-station">
      <div className="mx-2 d-flex flex-wrap border-bottom">
        <div>{station.title}</div>
        <div className="mx-2">
          <span className="mx-2 text-nowrap text-dark-blue-green">
            <i className="fas fa-thermometer-half" /> {temperature}°C
          </span>
          <span className="mx-2 text-nowrap text-dark-blue-green">
            <i className="fas fa-tint" /> {humidity}%
          </span>
          <span className="mx-2 text-nowrap text-dark-blue-green">
            <i className="far fa-sun" /> {light}lux
          </span>
        </div>
        <div className="mx-2">
          <span className="mx-2 text-nowrap cursor-pointer" onClick={handleToggleLed}>
            {ledState
              ? <i className="far fa-lightbulb text-orange" />
              : <i className="fas fa-lightbulb text-light-gray" />}
          </span>
        </div>
        <div onClick={handleToggleAutomated} className="mx-2 text-orange cursor-pointer">
          {station.automated
            ? <span><i className="fas fa-cogs" /> Tự động</span>
            : <span><i className="fas fa-hand-sparkles" /> Thủ công</span>}
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {station.plants.map(userPlant => (
          <StationPlant
            key={userPlant._id}
            stationId={station._id}
            userPlantId={userPlant._id}
            plant={userPlant.plant}
            onPlantRemoved={onPlantRemoved}
          />
        ))}
        <NewUserPlantCard className="garden-station__add-new-plant" station={station} onNewPlantAdded={onNewPlantAdded} />
      </div>
    </div>
  );
});
