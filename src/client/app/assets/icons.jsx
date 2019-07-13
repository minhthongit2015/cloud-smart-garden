import React from 'react';

import { src as AICloudIconSrc } from './images/ai-cloud.png';
import { src as MyGardenIconSrc } from './images/my-garden.png';
import { src as SmileCityIconSrc } from './images/smile-city.png';

export const AICloudIcon = <img src={AICloudIconSrc} alt="" {...this.props} />;
export const MyGardenIcon = <img src={MyGardenIconSrc} alt="" {...this.props} />;
export const SmileCityIcon = <img src={SmileCityIconSrc} alt="" {...this.props} />;

export default {
  AICloudIcon,
  MyGardenIcon,
  SmileCityIcon
};
