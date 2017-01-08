import React from 'react';
import { connect } from 'react-redux';

class ResizeTop extends React.Component {
  constructor() {
    super();

    this.state = {
      style: {
        position: 'absolute',
        top: '-1px',
        right: '0',
        left: '0',
        height: '3px',
        cursor: 'ns-resize',
        background: 'red',
      },
    };

    this.mouseDown = this.mouseDown.bind(this);
  }

  mouseDown() {
    const windowzDOM = this.props.windowzDOM();
    const windowzPos = windowzDOM.getBoundingClientRect();
    let top = windowzPos.top;

    const mousemoveHandler = (e) => {
      const topChange = e.clientY - top;
      const moveTop = top + topChange;

      windowzDOM.style.cssText = `position: absolute;
                                  top: ${moveTop}px;
                                  right: ${window.innerWidth - windowzPos.right}px;
                                  bottom: ${window.innerHeight - windowzPos.bottom}px;
                                  left: ${windowzPos.left}px;
                                  z-index: ${windowzDOM.style.zIndex};`;

      top = moveTop;
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

ResizeTop.propTypes = {
  windowzDOM: React.PropTypes.func,
  // windowz: React.PropTypes.arrayOf(React.PropTypes.object),
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    windowz: state.default.windowz,
  };
};

const ResizeTopMap = connect(
  mapStateToProps,
  null,
)(ResizeTop);

export default ResizeTopMap;
