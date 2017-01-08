import React from 'react';
import { connect } from 'react-redux';

class ResizeLeft extends React.Component {
  constructor() {
    super();

    this.state = {
      style: {
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '-1px',
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
    let left = windowzPos.left;

    const mousemoveHandler = (e) => {
      const leftChange = e.clientX - left;
      const moveLeft = left + leftChange;

      windowzDOM.style.cssText = `position: absolute;
                                  top: ${windowzPos.top}px;
                                  right: ${window.innerWidth - windowzPos.right}px;
                                  left: ${moveLeft}px;
                                  height: ${windowzPos.height}px;
                                  z-index: ${windowzDOM.style.zIndex};`;

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

ResizeLeft.propTypes = {
  windowzDOM: React.PropTypes.func,
  // windowz: React.PropTypes.arrayOf(React.PropTypes.object),
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    windowz: state.default.windowz,
  };
};

const ResizeLeftMap = connect(
  mapStateToProps,
  null,
)(ResizeLeft);

export default ResizeLeftMap;
