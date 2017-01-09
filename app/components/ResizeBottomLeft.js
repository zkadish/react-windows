import React from 'react';
import { connect } from 'react-redux';

class ResizeBottomLeft extends React.Component {
  constructor() {
    super();

    this.state = {
      style: {
        position: 'absolute',
        bottom: '-1px',
        left: '-1px',
        height: '10px',
        width: '10px',
        cursor: 'nesw-resize',
        // background: 'blue',
      },
    };

    this.mouseDown = this.mouseDown.bind(this);
  }

  mouseDown() {
    const windowzDOM = this.props.windowzDOM();
    const windowzPos = windowzDOM.getBoundingClientRect();
    let bottom = window.innerHeight - windowzPos.bottom;
    let left = windowzPos.left;

    const mousemoveHandler = (e) => {
      const bottomChange = (window.innerHeight - e.clientY) - bottom;
      const moveBottom = bottom + bottomChange;

      const leftChange = e.clientX - left;
      const moveLeft = left + leftChange;

      windowzDOM.style.cssText = `position: absolute;
                                  top: ${windowzPos.top}px;
                                  right: ${window.innerWidth - windowzPos.right}px;
                                  bottom: ${moveBottom}px;
                                  left: ${moveLeft}px;
                                  z-index: ${windowzDOM.style.zIndex};`;
      bottom = moveBottom;
      left = moveLeft;
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

ResizeBottomLeft.propTypes = {
  windowzDOM: React.PropTypes.func,
  // windowz: React.PropTypes.arrayOf(React.PropTypes.object),
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    windowz: state.default.windowz,
  };
};

const ResizeBottomLeftMap = connect(
  mapStateToProps,
  null,
)(ResizeBottomLeft);

export default ResizeBottomLeftMap;
