import React from 'react';

import FontIcon from './FontIcon';

function WindowzHeader(props) {
  let minMaxIcon = 'window-maximize';

  function toggleMinMax() {
    if (minMaxIcon === 'window-maximize') {
      minMaxIcon = 'window-minimize';
    } else {
      minMaxIcon = 'window-maximize';
    }
    console.log(minMaxIcon);
  }

  const closeWindowz = function test() {
    console.log('closeWindowz')
  };

  return (
    <div
      className="windowz-header"
      onMouseDown={props.moveWindowz}
    >
      <div className="title">
        header
      </div>
      <FontIcon
        icon={minMaxIcon}
        class="minmax-icon"
        onClick={toggleMinMax}
      />
      <FontIcon
        onClick={closeWindowz}
        icon="close"
        class="close-icon"
      />
    </div>
  );
}

WindowzHeader.propTypes = {
  moveWindowz: React.PropTypes.func,
};

export default WindowzHeader;
