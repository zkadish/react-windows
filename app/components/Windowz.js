import React from 'react';
import { connect } from 'react-redux';

import WindowzHeader from './WindowzHeader';
import ResizeLeft from './ResizeLeft';
import ResizeRight from './ResizeRight';
import ResizeTop from './ResizeTop';
import ResizeBottom from './ResizeBottom';
import ResizeTopLeft from './ResizeTopLeft';
import ResizeTopRight from './ResizeTopRight';
import ResizeBottomLeft from './ResizeBottomLeft';
import ResizeBottomRight from './ResizeBottomRight';

class Windowz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      windowzDOM: this.windowzDOM || null,
    };

    this.moveWindowz = this.moveWindowz.bind(this);
    this.bringToFront = this.bringToFront.bind(this);
    this.getWindowzDOM = this.getWindowzDOM.bind(this);
  }

  componentDidMount() {
    // console.log('Windowz componentDidMount', this.windowzDOM);
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log('componentWillReceiveProps', nextProps);
  // }

  componentWillUnmount() {
    // console.log('componentWillUnmount', this.props.details.id);
  }

  getWindowzDOM() {
    return this.windowzDOM;
  }

  moveWindowz(event) {
    // console.log('moveWindowz');
    let windowzPos = this.windowzDOM.getBoundingClientRect();
    let top = windowzPos.top;
    const offsetTop = windowzPos.top - event.clientY;
    let left = windowzPos.left;
    const offsetLeft = windowzPos.left - event.clientX;

    const mouseMoveHandler = (e) => {
      const changeTop = e.clientY - top;
      let moveTop = (top + offsetTop) + changeTop;
      if (moveTop <= 0) {
        moveTop = 0;
      }
      if (moveTop >= window.innerHeight - windowzPos.height) {
        moveTop = window.innerHeight - windowzPos.height;
      }
      const changeLeft = e.clientX - left;
      let moveLeft = (left + offsetLeft) + changeLeft;
      if (moveLeft <= 0) {
        moveLeft = 0;
      }
      if (moveLeft >= window.innerWidth - windowzPos.width) {
        moveLeft = window.innerWidth - windowzPos.width;
      }
      this.windowzDOM.style.cssText = `position: absolute;
                                       top: ${moveTop}px;
                                       left: ${moveLeft}px;
                                       height: ${windowzPos.height}px;
                                       width: ${windowzPos.width}px;
                                       z-index: ${this.windowzDOM.style.zIndex}`;

      top = moveTop;
      left = moveLeft;
    };

    const mouseUpHandler = () => {
      windowzPos = this.windowzDOM.getBoundingClientRect();
      const details = {
        ...this.props.details,
        style: {
          position: 'absolute',
          top: `${windowzPos.top}px`,
          left: `${windowzPos.left}px`,
          height: `${windowzPos.height}px`,
          width: `${windowzPos.width}px`,
          zIndex: `${this.windowzDOM.style.zIndex}`,
        },
      };
      this.props.dispatch({ type: 'UPDATE_WINDOWZ', value: details });

      window.removeEventListener('mousemove', mouseMoveHandler, false);
      window.removeEventListener('mouseup', mouseUpHandler, false);
    };

    window.addEventListener('mousemove', mouseMoveHandler, false);
    window.addEventListener('mouseup', mouseUpHandler, false);
  }

  bringToFront() {
    // console.log('bringToFront', this.props.zIndex);
    const windowzPos = this.windowzDOM.getBoundingClientRect();
    const details = {
      ...this.props.details,
      style: {
        position: 'absolute',
        top: `${windowzPos.top}px`,
        left: `${windowzPos.left}px`,
        height: `${windowzPos.height}px`,
        width: `${windowzPos.width}px`,
        zIndex: `${this.props.zIndex}`,
      },
    };

    this.props.dispatch({ type: 'UPDATE_WINDOWZ', value: details });
    this.props.dispatch({ type: 'INCREMENT_ZINDEX' });
  }

  render() {
    // console.log('Windowz render()', this.props.windowzArray);
    // get "this" window from windowz array
    // so that is renders with updates
    const windowz = this.props.windowzArray.filter(
      w => w.id === this.props.id,
    )[0];

    return (
      <div
        ref={(c) => { this.windowzDOM = c; }}
        id={this.props.id}
        className="windowz-container"
        style={windowz.style}
        onMouseDown={this.bringToFront}
      >
        <WindowzHeader
          moveWindowz={this.moveWindowz}
          details={this.props.details}
        />
        <div>
          {this.props.details.id}
        </div>
        <ResizeLeft windowzDOM={this.getWindowzDOM} />
        <ResizeRight windowzDOM={this.getWindowzDOM} />
        <ResizeTop windowzDOM={this.getWindowzDOM} />
        <ResizeBottom windowzDOM={this.getWindowzDOM} />
        <ResizeTopLeft windowzDOM={this.getWindowzDOM} />
        <ResizeTopRight windowzDOM={this.getWindowzDOM} />
        <ResizeBottomLeft windowzDOM={this.getWindowzDOM} />
        <ResizeBottomRight windowzDOM={this.getWindowzDOM} />
      </div>
    );
  }
}

Windowz.propTypes = {
  dispatch: React.PropTypes.func,
  id: React.PropTypes.string,
  zIndex: React.PropTypes.number,
  windowzArray: React.PropTypes.arrayOf(
    React.PropTypes.object,
  ),
  details: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
    React.PropTypes.number,
  ]),
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    windowzArray: state.default.windowz,
    zIndex: state.default.zIndex,
  };
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
};

const WindowzMap = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Windowz);

export default WindowzMap;
