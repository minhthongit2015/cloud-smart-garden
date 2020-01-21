import React from 'react';

export const FarmImgSrc = '/images/HydroponicTerminology_BlogLanding-768x411.jpg';
export const ShopEavesImgSrc = '/images/eaves.png';
export const FoodStoreImgSrc = '/images/fresh-vegetables-food-safety-vietnam-GAP.png';
export const ToolStoreImgSrc = '/images/2-dung-cu-1.jpg';
export const GardenImgSrc = '/images/373d744941b5cbc14f0fbe6732fc3a10.jpg';

export const FarmImage = props => <img src={FarmImgSrc} alt="Farm" draggable={false} {...props} />;

export default {
  FarmImgSrc,
  ShopEavesImgSrc,
  FoodStoreImgSrc,
  ToolStoreImgSrc,
  GardenImgSrc
};
