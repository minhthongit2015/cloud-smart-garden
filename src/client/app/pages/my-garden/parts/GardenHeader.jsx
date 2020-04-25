import React, { memo } from 'react';
import FixedRatioImage from '../../../components/utils/fixed-ratio-image/FixedRatioImage';
import PerchIcon from '../../../components/utils/image/PerchIcon';
import TodaySong from '../components/TodaySong';

export default memo(({ garden }) => (
  <div className="position-relative">
    {garden && <FixedRatioImage className="rounded" src={garden.previewPhoto} ratio={1 / 3} />}
    <PerchIcon src="/icons/garden/owl.svg" alt="an Own" flip left="20px" />
    <PerchIcon src="/icons/garden/owl_2.svg" alt="an Young Own" flip left="50px" />
    <PerchIcon src="/icons/garden/bee.svg" alt="a Bee" flip right="10px" />
    <TodaySong src="https://youtu.be/Y7BBiIZRFrc" />
  </div>
));
