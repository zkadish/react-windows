import React from 'react';

import WindowzHeader from './WindowzHeader';

class Windowz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      style: {
        position: 'absolute',
        top: '100px',
        left: '100px',
        height: '300px',
        width: '300px',
      },
    };

    this.moveWindowz = this.moveWindowz.bind(this);
  }

  moveWindowz(event) {
    const windowzPos = this.windowzDOM.getBoundingClientRect();
    let top = windowzPos.top;
    const offSetTop = windowzPos.top - event.clientY;
    let left = windowzPos.left;
    const offSetLeft = windowzPos.left - event.clientX;

    const mouseMoveHandler = (e) => {
      const changeTop = e.clientY - top;
      const moveTop = (top + offSetTop) + changeTop;

      const changeLeft = e.clientX - left;
      const moveLeft = (left + offSetLeft) + changeLeft;

      this.windowzDOM.style.cssText = `position: absolute;
                                       top: ${moveTop}px;
                                       left: ${moveLeft}px;
                                       height: ${windowzPos.height}px;
                                       width: ${windowzPos.width}px`;

      top = moveTop;
      left = moveLeft;
    };

    function mouseUpHandler() {
      window.removeEventListener('mousemove', mouseMoveHandler, false);
      window.removeEventListener('mouseup', mouseUpHandler, false);
    }

    window.addEventListener('mousemove', mouseMoveHandler, false);
    window.addEventListener('mouseup', mouseUpHandler, false);
  }

  render() {
    return (
      <div
        ref={(c) => { this.windowzDOM = c; }}
        id={this.props.id}
        className="windowz-container"
        style={this.state.style}
      >
        <WindowzHeader
          moveWindowz={this.moveWindowz}
        />
      </div>
    );
  }
}

Windowz.propTypes = {
  id: React.PropTypes.string,
};

export default Windowz;
