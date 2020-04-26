import React from 'react';
import {
  Switch, Route, NavLink
} from 'react-router-dom';
import { Section } from '../../../layouts/base/section';
import LeafLoading from '../../../components/utils/loadings/LeafLoading';
import RouteConstants from '../../../utils/RouteConstants';
import GardenPostsSection from './stories/TabGardenPosts';
import Reviews from './stories/TabGardenReviews';
import Photos from './stories/TabGardenPhotos';
import Videos from './stories/TabGardenVideos';
import SmoothSize from '../../../components/utils/smooth-size/SmoothSize';


const StoryNavs = [
  { title: 'Bài Viết', to: 'posts', icon: 'fas fa-feather-alt' },
  { title: 'Lời nhắn', to: 'letters', icon: 'far fa-star' },
  { title: 'Photos', to: 'photos', icon: 'fas fa-camera-retro' },
  { title: 'Videos', to: 'videos', icon: 'fas fa-film' }
];

export default ({ user }) => {
  function handleClick(event) {
    if (event) { event.stopPropagation(); event.preventDefault(); }
    if (window.historyz.location.pathname === event.currentTarget.name) {
      window.historyz.replace(RouteConstants.myGardenLink);
    } else {
      window.historyz.replace(event.currentTarget.name);
    }
  }
  function isActive(nav, match, location) {
    if (nav.to === 'posts' && location.pathname === RouteConstants.myGardenLink) {
      return true;
    }
    return match;
  }
  return (
    <Section beautyFont title="Stories" className="mt-5">
      <div className="d-flex justify-content-center flex-wrap text-center">
        {StoryNavs.map(nav => (
          <NavLink
            onClick={handleClick}
            key={nav.to}
            to={`${RouteConstants.myGardenLink}/${nav.to}`}
            isActive={(...args) => isActive(nav, ...args)}
            name={`${RouteConstants.myGardenLink}/${nav.to}`}
            className="px-2 my-2 w-2 w-sm-4 w-md-6 w-lg-8 d-flex align-items-center justify-content-center cursor-pointer border-right text-beauty text-inset text-1.5"
          >
            <span>
              <i className={nav.icon} /> <span className="text-nowrap">{nav.title}</span>
            </span>
          </NavLink>
        ))}
      </div>
      <SmoothSize timeout="200" padding="0">
        <React.Suspense fallback={<LeafLoading overlaping text="Beyond Garden" />}>
          <Switch>
            <Route path={`${RouteConstants.myGardenPath}/posts`}><GardenPostsSection user={user} /></Route>
            <Route path={`${RouteConstants.myGardenPath}/reviews`}><Reviews /></Route>
            <Route path={`${RouteConstants.myGardenPath}/photos`}><Photos /></Route>
            <Route path={`${RouteConstants.myGardenPath}/videos`}><Videos /></Route>
            <Route path={`${RouteConstants.myGardenPath}`}><GardenPostsSection user={user} /></Route>
          </Switch>
        </React.Suspense>
      </SmoothSize>
    </Section>
  );
};
