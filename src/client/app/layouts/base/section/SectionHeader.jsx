import React, { PureComponent } from 'react';
import classNames from 'classnames';
import './SectionHeader.scss';

export default class SectionHeader extends PureComponent {
  render() {
    const { className, centered, ...restProps } = this.props;
    return (
      <div
        className={classNames(
          'base-section__header',
          className,
          { 'text-center': centered }
        )}
        {...restProps}
      />
    );
  }
}
