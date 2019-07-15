import React from 'react';

import AICloudSrc from './images/ai-cloud.png';
import MyGardenSrc from './images/my-garden.png';
import SmileCitySrc from './images/smile-city.png';
import ShoppingCartSrcz from './images/shopping-cart.svg';

export const AICloudIcon = props => <img src={AICloudSrc} alt="" {...props} />;
export const MyGardenIcon = props => <img src={MyGardenSrc} alt="" {...props} />;
export const SmileCityIcon = props => <img src={SmileCitySrc} alt="" {...props} />;
export const ShoppingCartSrc = ShoppingCartSrcz;

export default {
  AICloudIcon,
  MyGardenIcon,
  SmileCityIcon,
  ShoppingCartSrc
};
