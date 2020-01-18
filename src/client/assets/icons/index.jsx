import React from 'react';

export const AICloudSrc = '/icons/nav/ai-cloud.png';
export const MyGardenSrc = '/icons/nav/my-garden.png';
export const SmileCitySrc = '/icons/nav/smile-city.png';

export const FarmSrc = '/icons/agriculture.svg';
export const PlantPot1Src = '/icons/plant.svg';
export const ForestFireSrc = '/icons/forest-fire.svg';
export const DinosaurSrc = '/icons/triceratops.svg';
export const GardenOwnerSrc = '/icons/bonsai.svg';
export const ToolStoreSrc = '/icons/trowel.svg';
export const ShoppingCartSrc = '/icons/shopping-cart.svg';
export const FlagSrc = '/icons/flag.svg';

export const GiftSrc = '/icons/gift.svg';
export const GiftOpenSrc = '/icons/gift-open.svg';

function CreateIcon(imgSrc, alt, title, attributes) {
  return props => (
    <img src={imgSrc} alt={alt} title={title} draggable={false} {...attributes} {...props} />
  );
}

export const IconAICloud = CreateIcon(AICloudSrc, 'AI Cloud');
export const IconMyGarden = CreateIcon(MyGardenSrc, 'My Garden');
export const IconSmileCity = CreateIcon(SmileCitySrc, 'Smile City');
export const IconShoppingCart = CreateIcon(ShoppingCartSrc, 'Shopping Cart');
export const IconGiftOpen = CreateIcon(GiftOpenSrc, 'Gift', '', { width: '80%', height: '80%' });
export const IconGift = CreateIcon(GiftSrc, 'Gift', '', { width: '80%', height: '80%' });

export { default as IconAlphaTeam } from './layout/IconAlphaTeam';
export { default as IconEarth } from './layout/IconEarth';
export { default as IconHome } from './nav/IconHome';
export { default as IconPlanetEarth } from './nav/IconPlanetEarth';
export { default as IconEarthPicture } from './nav/IconEarthPicture';
export { default as IconEarthPictureStatic } from './nav/IconEarthPictureStatic';
export { default as IconTheRealWorld } from './nav/IconTheRealWorld';
export { default as IconWhatYouCanDo } from './nav/IconWhatYouCanDo';
export { default as IconYourQuestion } from './nav/IconYourQuestion';
export { default as IconMore } from './nav/IconMore';
export { default as IconRankLeader } from './IconRankLeader';
export { default as IconCommunity } from './utils/IconCommunity';
export { default as IconBookmark } from './layout/IconBookmark';
export { default as IconRaisedFist } from './layout/IconRaisedFist';
export { default as IconPlusPoint } from './utils/IconPlusPoint';
export { default as IconFlag } from './map/IconFlag';
export { default as IconPlus } from './utils/IconPlus';
export { default as IconCheckbox } from './utils/IconCheckbox';
export { default as IconThanks } from './utils/IconThanks';

export default {
  CreateIcon,
  IconAICloud,
  IconMyGarden,
  IconGiftOpen,
  IconSmileCity,
  IconShoppingCart,

  ShoppingCartSrc,
  PlantPot1Src,
  FarmSrc,
  ToolStoreSrc,
  GardenOwnerSrc,
  DinosaurSrc,
  FlagSrc,
  ForestFireSrc
};
