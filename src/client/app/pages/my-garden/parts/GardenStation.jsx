import React, { memo } from 'react';
import StationPlant from './StationPlant';
import NewUserPlantCard from './NewUserPlantCard';
import './GardenStation.scss';


export default memo(({ station, onNewPlantAdded, onPlantRemoved }) => (
  <div className="garden-station">
    <div className="px-2 border-bottom">{station.title}</div>
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
));
