import React from 'react';

import AICloudIconSrc from './images/ai-cloud.png';
import MyGardenIconSrc from './images/my-garden.png';
import SmileCityIconSrc from './images/smile-city.png';

export const AICloudIcon = props => <img src={AICloudIconSrc} alt="" {...props} />;
export const MyGardenIcon = props => <img src={MyGardenIconSrc} alt="" {...props} />;
export const SmileCityIcon = props => <img src={SmileCityIconSrc} alt="" {...props} />;

export default {
  AICloudIcon,
  MyGardenIcon,
  SmileCityIcon
};
