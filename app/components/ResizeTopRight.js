import React from 'react';
import { connect } from 'react-redux';

class ResizeTopRight extends React.Component {
  constructor() {
    super();

    this.state = {
      style: {
        position: 'absolute',
        top: '-1px',
        right: '-1px',
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
    let top = windowzPos.top;
    let right = window.innerWidth - windowzPos.right;

    const mousemoveHandler = (e) => {
      const topChange = e.clientY - top;
      const moveTop = top + topChange;

      const rightChange = (window.innerWidth - e.clientX) - right;
      const moveRight = right + rightChange;

      windowzDOM.style.cssText = `position: absolute;
                                  top: ${moveTop}px;
                                  right: ${moveRight}px;
                                  bottom: ${window.innerHeight - windowzPos.bottom}px;
                                  left: ${windowzPos.left}px;
                                  z-index: ${windowzDOM.style.zIndex};`;
      top = moveTop;
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

ResizeTopRight.propTypes = {
  windowzDOM: React.PropTypes.func,
  // windowz: React.PropTypes.arrayOf(React.PropTypes.object),
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    windowz: state.default.windowz,
  };
};

const ResizeTopRightMap = connect(
  mapStateToProps,
  null,
)(ResizeTopRight);

export default ResizeTopRightMap;
