import React from 'react';
import { MDBBtn } from 'mdbreact';
import classnames from 'classnames';
import '../toolbar/Toolbar.scss';
import './RightToolbar.scss';
import { getAutoDispatcher } from '../../Helper';
import { IconPlus } from '../../../../assets/icons';
import TimeAgo from '../../utils/time-ago/TimeAgo';
import { groupBy } from '../../../utils/index';


export default class extends React.Component {
  constructor(props) {
    super(props);
    this.autoDispatcher = getAutoDispatcher(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: true
    };
  }

  toggle() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  renderPlace(place, extraContent = null) {
    return (
      <div
        key={place._id}
        className="map-toolbar__list__item"
        tabIndex="-1"
      >
        <div><TimeAgo time={place.createdAt} /></div>
        <div
          className="map-toolbar__list__link"
          tabIndex="-1"
          onClick={event => this.autoDispatcher(event, place)}
        >
          {place.name || (place.post && place.post.title)}
        </div>
        {extraContent}
      </div>
    );
  }

  renderPlaceGroup(places) {
    return this.renderPlace(places[0], (
      <div className="map-toolbar__list__item__group">
        {places.map((place, index) => (
          <div
            key={place._id}
            className="map-toolbar__list__item__group__index"
            tabIndex="-1"
            onClick={event => this.autoDispatcher(event, place)}
            title={TimeAgo.fromNowDetailLn(place.createdAt)}
          >{places.length - index}
          </div>
        ))}
      </div>
    ));
  }

  render() {
    const {
      className, handler, places, ...restProps
    } = this.props;
    const { isOpen } = this.state;

    let groupedPlaces;
    if (places) {
      groupedPlaces = groupBy(places, 'post._id');
    }

    return (
      <div
        className={classnames(
          `map-toolbar right-toolbar ${className || ''}`,
          { open: isOpen }
        )}
        {...restProps}
      >
        <div className="d-flex justify-content-end align-items-center">
          {isOpen && (
            <div className="map-toolbar__title mx-2">Tin tức mới</div>
          )}
          <MDBBtn
            className="map-toolbar__toggle map-toolbar__btn"
            color="none"
            onClick={this.toggle}
            title="Tin tức mới [Tab]"
          >
            <IconPlus width="100%" height="100%" />
          </MDBBtn>
        </div>
        {groupedPlaces && (
          <div className="map-toolbar__list d-flex flex-column flex-fill">
            {Object.values(groupedPlaces).map(placesz => (
              placesz.length === 1
                ? this.renderPlace(placesz[0])
                : this.renderPlaceGroup(placesz)
            ))}
          </div>
        )}
      </div>
    );
  }
}
