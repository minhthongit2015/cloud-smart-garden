import React from 'react';
import Global from '../utils/Global';

export default (props) => {
  console.log('render test');
  Global.useState('x', 0);
  function click() {
    // Global.x += 1;
    Global.x += 1;
  }
  return (
    <React.Fragment>
      <button
        type="button"
        onClick={click}
      >{props.children}: {Global.x}
      </button>
    </React.Fragment>
  );
};
