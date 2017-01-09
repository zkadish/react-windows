import React from 'react';
import { connect } from 'react-redux';

class ResizeBottom extends React.Component {
  constructor() {
    super();

    this.state = {
      style: {
        position: 'absolute',
        right: '0',
        bottom: '-1px',
        left: '0',
        height: '3px',
        cursor: 'ns-resize',
        // background: 'red',
      },
    };

    this.mouseDown = this.mouseDown.bind(this);
  }

  mouseDown() {
    const windowzDOM = this.props.windowzDOM();
    const windowzPos = windowzDOM.getBoundingClientRect();
    let bottom = window.innerHeight - windowzPos.bottom;

    const mousemoveHandler = (e) => {
      const bottomChange = (window.innerHeight - e.clientY) - bottom;
      const moveBottom = bottom + bottomChange;

      windowzDOM.style.cssText = `position: absolute;
                                  top: ${windowzPos.top}px;
                                  right: ${window.innerWidth - windowzPos.right}px;
                                  bottom: ${moveBottom}px;
                                  left: ${windowzPos.left}px;
                                  z-index: ${windowzDOM.style.zIndex};`;

      bottom = moveBottom;
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

ResizeBottom.propTypes = {
  windowzDOM: React.PropTypes.func,
  // windowz: React.PropTypes.arrayOf(React.PropTypes.object),
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    windowz: state.default.windowz,
  };
};

const ResizeBottomMap = connect(
  mapStateToProps,
  null,
)(ResizeBottom);

export default ResizeBottomMap;
