import React from 'react';

export const FarmSrc = 'http://static.saferbrand.com/media/articles/images/373/HydroponicTerminology_BlogLanding-768x411.jpg';
export const ShopEavesSrc = '/images/eaves.png';
export const FoodStoreSrc = 'https://149363812.v2.pressablecdn.com/wp-content/uploads/2017/11/fresh-vegetables-food-safety-vietnam-GAP.png';
export const ToolStoreSrc = 'http://zadola.vn/wp-content/uploads/2019/04/2-dung-cu-1.jpg';
export const GardenSrc = 'https://i.pinimg.com/originals/37/3d/74/373d744941b5cbc14f0fbe6732fc3a10.jpg';

export const FarmImage = props => <img src={FarmSrc} alt="Farm" draggable={false} {...props} />;

export default {
  FarmSrc,
  ShopEavesSrc,
  FoodStoreSrc,
  ToolStoreSrc,
  GardenSrc
};
