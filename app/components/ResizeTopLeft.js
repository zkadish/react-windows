import React from 'react';
import { connect } from 'react-redux';

class ResizeTopLeft extends React.Component {
  constructor() {
    super();

    this.state = {
      style: {
        position: 'absolute',
        top: '-1px',
        left: '-1px',
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
    let top = windowzPos.top;
    let left = windowzPos.left;

    const mousemoveHandler = (e) => {
      const topChange = e.clientY - top;
      const moveTop = top + topChange;

      const leftChange = e.clientX - left;
      const moveLeft = left + leftChange;

      windowzDOM.style.cssText = `position: absolute;
                                  top: ${moveTop}px;
                                  right: ${window.innerWidth - windowzPos.right}px;
                                  bottom: ${window.innerHeight - windowzPos.bottom}px;
                                  left: ${moveLeft}px;
                                  z-index: ${windowzDOM.style.zIndex};`;
      top = moveTop;
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

ResizeTopLeft.propTypes = {
  windowzDOM: React.PropTypes.func,
  // windowz: React.PropTypes.arrayOf(React.PropTypes.object),
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    windowz: state.default.windowz,
  };
};

const ResizeTopLeftMap = connect(
  mapStateToProps,
  null,
)(ResizeTopLeft);

export default ResizeTopLeftMap;
