import React from 'react';
import { connect } from 'react-redux';

class ResizeRight extends React.Component {
  constructor() {
    super();

    this.state = {
      style: {
        position: 'absolute',
        top: '0',
        bottom: '0',
        right: '-1px',
        width: '3px',
        cursor: 'ew-resize',
        background: 'red',
      },
    };

    this.mouseDown = this.mouseDown.bind(this);
  }

  mouseDown() {
    const windowzDOM = this.props.windowzDOM();
    const windowzPos = windowzDOM.getBoundingClientRect();
    let right = window.innerWidth - windowzPos.right;

    const mousemoveHandler = (e) => {
      const rightChange = (window.innerWidth - e.clientX) - right;
      const moveRight = right + rightChange;

      windowzDOM.style.cssText = `position: absolute;
                                  top: ${windowzPos.top}px;
                                  right: ${moveRight}px;
                                  left: ${windowzPos.left}px;
                                  height: ${windowzPos.height}px;
                                  z-index: ${windowzDOM.style.zIndex};`;

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

ResizeRight.propTypes = {
  windowzDOM: React.PropTypes.func,
  // windowz: React.PropTypes.arrayOf(React.PropTypes.object),
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    windowz: state.default.windowz,
  };
};

const ResizeRightMap = connect(
  mapStateToProps,
  null,
)(ResizeRight);

export default ResizeRightMap;
