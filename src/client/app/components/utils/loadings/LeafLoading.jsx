/* eslint-disable react/no-array-index-key */
import React from 'react';
import { BreedingRhombusSpinner } from 'react-epic-spinners';
import classnames from 'classnames';
import './Loading.scss';


export default (props) => {
  const [seconds, setSeconds] = props.timeout > 0
    ? React.useState(props.timeout)
    : [];

  if (seconds > 0) {
    setTimeout(() => setSeconds(seconds - 1), 1000);
  } else if (seconds === 0) {
    window.location.reload();
  }

  return (
    <div
      className={
        classnames(
          'loading overlap',
          'd-flex w-100 h-100 justify-content-center align-items-center',
          { overlaping: props.overlaping }
        )}
    >
      <BreedingRhombusSpinner color="#4285f4" size={75} />
      <div className="loading-text">
        {(props.text || 'đang tải...').split('').map((c, i) => <span key={c + i}>{c}</span>)}
      </div>
      {seconds >= 0 && (
        <div className={`reloading-text ${seconds === 0 ? 'fade slower' : ''}`}>tải lại sau {seconds} giây</div>
      )}
    </div>
  );
};
