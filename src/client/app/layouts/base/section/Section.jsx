import React from 'react';
import PropTypes from 'prop-types';
import './Section.scss';
import { MDBCollapse, MDBBtn } from 'mdbreact';
import Toggleable from '../../../components/utils/toggleable/Toggleable';

class Section extends Toggleable {
  renderSection(content) {
    const {
      className, style, title, beautyFont, children
    } = this.props;

    return (
      <section
        className={`base-section ${className || ''}`}
        style={style}
      >
        {title && (
          <div className={`base-section__title ${beautyFont ? 'beauty-font' : ''}`}>{title}</div>
        )}
        {content || children}
      </section>
    );
  }

  renderWithCollapse() {
    return (
      this.props.collapseAll
        ? (
          <MDBCollapse isOpen={this.isOpen}>
            {this.renderSection(
              <React.Fragment>
                {this.renderToggler()}
                {this.props.children}
              </React.Fragment>
            )}
          </MDBCollapse>
        ) : (
          this.renderSection(
            <React.Fragment>
              {this.renderToggler()}
              <MDBCollapse isOpen={this.isOpen}>
                {this.props.children}
              </MDBCollapse>
            </React.Fragment>
          )
        )
    );
  }

  renderToggler() {
    const { isOpen } = this;
    return (
      <div className="text-right h-0">
        <MDBBtn
          className="px-2 py-1 mt--5"
          onClick={this.toggle}
        ><i className={isOpen ? 'fas fa-compress' : 'fas fa-expand'} /> {isOpen ? 'thu gọn' : 'mở rộng'}
        </MDBBtn>
      </div>
    );
  }

  render() {
    return this.props.togglable
      ? this.renderWithCollapse()
      : this.renderSection();
  }
}

Section.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  beautyFont: PropTypes.bool,
  togglable: PropTypes.bool
};

Section.defaultProps = {
  className: '',
  title: '',
  beautyFont: false,
  togglable: false
};

export default Section;
