import React from 'react';
import { connect } from 'react-redux';

class ResizeBottomRight extends React.Component {
  constructor() {
    super();

    this.state = {
      style: {
        position: 'absolute',
        right: '-1px',
        bottom: '-1px',
        height: '10px',
        width: '10px',
        cursor: 'nwse-resize',
        // background: 'blue',
      },
    };

    this.mouseDown = this.mouseDown.bind(this);
  }

  mouseDown() {
    const windowzDOM = this.props.windowzDOM();
    const windowzPos = windowzDOM.getBoundingClientRect();
    let bottom = window.innerHeight - windowzPos.bottom;
    let right = window.innerWidth - windowzPos.right;

    const mousemoveHandler = (e) => {
      const bottomChange = (window.innerHeight - e.clientY) - bottom;
      const moveBottom = bottom + bottomChange;

      const rightChange = (window.innerWidth - e.clientX) - right;
      const moveRight = right + rightChange;

      windowzDOM.style.cssText = `position: absolute;
                                  top: ${windowzPos.top}px;
                                  right: ${moveRight}px;
                                  bottom: ${moveBottom}px;
                                  left: ${windowzPos.left}px;
                                  z-index: ${windowzDOM.style.zIndex};`;
      bottom = moveBottom;
      right = moveRight;
    };

    function mouseupHandler() {
      document.removeEventListener('mousemove', mousemoveHandler, false);
      document.removeEventListener('mouseup', mouseupHandler, false);
    }

    document.addEventListener('mousemove', mousemoveHandler, false);
    document.addEventListener('mouseup', mouseupHandler, false);
  }

  render() {
    return (
      <div
        style={this.state.style}
        onMouseDown={this.mouseDown}
      />
    );
  }
}

ResizeBottomRight.propTypes = {
  windowzDOM: React.PropTypes.func,
  // windowz: React.PropTypes.arrayOf(React.PropTypes.object),
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    windowz: state.default.windowz,
  };
};

const ResizeBottomRightMap = connect(
  mapStateToProps,
  null,
)(ResizeBottomRight);

export default ResizeBottomRightMap;
