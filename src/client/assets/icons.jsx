import React from 'react';

// nav
export const AICloudSrc = '/icons/nav/ai-cloud.png';
export const MyGardenSrc = '/icons/nav/my-garden.png';
export const SmileCitySrc = '/icons/nav/smile-city.png';

// Map
export const FarmSrc = '/icons/map/agriculture.svg';
export const GardenSrc = '/icons/map/plant.svg';
export const GardenOwnerSrc = '/icons/map/bonsai.svg';
export const ToolStoreSrc = '/icons/map/trowel.svg';
export const FoodStoreSrc = '/icons/map/shopping-cart.svg';
export const ExpertLvl1Src = '/icons/map/plant-book-lvl-1.svg';
export const ExpertLvl2Src = '/icons/map/plant-book-lvl-2.svg';
export const ExpertFlowerLvl1Src = '/icons/map/plant-book-flower-lvl-1.svg';

// Climate-Strike-Vietnam (legacy)
export const FlagSrc = '/icons/map-legacy/flag.svg';
export const DinosaurSrc = '/icons/map-legacy/triceratops.svg';
export const ForestFireSrc = '/icons/map-legacy/forest-fire.svg';

// Map Tools
export const BasketSrc = '/icons/map-tools/basket.svg';
export const GiftSrc = '/icons/map-tools/gift.svg';
export const GiftOpenSrc = '/icons/map-tools/gift-open.svg';

// Intranet
export const MilitaryRankSrc = '/icons/military-rank.svg';
export const FeatherPenSrc = '/icons/feather-pen.svg';

function CreateIcon(imgSrc, alt, title, attributes) {
  return props => (
    <img src={imgSrc} alt={alt} title={title} draggable={false} {...attributes} {...props} />
  );
}

const toggleIconSize = { width: '80%', height: '80%' };
const iconSize = { width: '32px', height: '32px' };
const inlineIconSize = { width: '20px', height: '20px' };

export const IconAICloud = CreateIcon(AICloudSrc, 'AI Cloud');
export const IconMyGarden = CreateIcon(MyGardenSrc, 'My Garden');
export const IconSmileCity = CreateIcon(SmileCitySrc, 'Smile City');
export const IconShoppingCart = CreateIcon(FoodStoreSrc, 'Shopping Cart');
export const IconGiftOpen = CreateIcon(GiftOpenSrc, 'Gift', '', toggleIconSize);
export const IconGift = CreateIcon(GiftSrc, 'Gift', '', toggleIconSize);
export const IconBasket = CreateIcon(BasketSrc, 'Giỏ Hàng', '', toggleIconSize);
export const IconMilitaryRank = CreateIcon(MilitaryRankSrc, 'Military Rank', '', iconSize);
export const IconFeatherPen = CreateIcon(FeatherPenSrc, 'Feather Pen', '', inlineIconSize);

export { default as IconAlphaTeam } from './icons/layout/IconAlphaTeam';
export { default as IconEarth } from './icons/layout/IconEarth';
export { default as IconHome } from './icons/nav/IconHome';
export { default as IconPlanetEarth } from './icons/nav/IconPlanetEarth';
export { default as IconEarthPicture } from './icons/nav/IconEarthPicture';
export { default as IconEarthPictureStatic } from './icons/nav/IconEarthPictureStatic';
export { default as IconTheRealWorld } from './icons/nav/IconTheRealWorld';
export { default as IconWhatYouCanDo } from './icons/nav/IconWhatYouCanDo';
export { default as IconYourQuestion } from './icons/nav/IconYourQuestion';
export { default as IconMore } from './icons/nav/IconMore';
export { default as IconRankLeader } from './icons/IconRankLeader';
export { default as IconCommunity } from './icons/utils/IconCommunity';
export { default as IconBookmark } from './icons/layout/IconBookmark';
export { default as IconRaisedFist } from './icons/layout/IconRaisedFist';
export { default as IconPlusPoint } from './icons/utils/IconPlusPoint';
export { default as IconFlag } from './icons/map/IconFlag';
export { default as IconPlus } from './icons/utils/IconPlus';
export { default as IconCheckbox } from './icons/utils/IconCheckbox';
export { default as IconThanks } from './icons/utils/IconThanks';

export default {
  CreateIcon,
  IconAICloud,
  IconMyGarden,
  IconGiftOpen,
  IconSmileCity,
  IconShoppingCart,
  IconBasket,

  IconMilitaryRank,
  IconFeatherPen,

  FoodStoreSrc,
  GardenSrc,
  FarmSrc,
  ToolStoreSrc,
  GardenOwnerSrc,
  DinosaurSrc,
  FlagSrc,
  ForestFireSrc
};
