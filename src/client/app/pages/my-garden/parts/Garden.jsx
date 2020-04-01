import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Section, SectionBody } from '../../../layouts/base/section';
import GardenStation from './GardenStation';
import RouteConstants from '../../../utils/RouteConstants';


export default memo(({ garden, onNewPlantAdded, onPlantRemoved }) => (
  <Section title={garden.title} beautyFont>
    <SectionBody>
      {garden.stations.map(station => (
        <GardenStation
          station={station}
          key={station._id}
          onNewPlantAdded={onNewPlantAdded}
          onPlantRemoved={onPlantRemoved}
        />
      ))}
      <Link to={RouteConstants.plantLibraryLink}>Central Library</Link>
    </SectionBody>
  </Section>
));
