import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cssobj from 'cssobj';

import * as actionCreators from '../store/actions/action-creators';

import WindowzHeader from './WindowzHeader';
import WindowzResizer from './WindowzResizer';

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

    // this.state = {
    //   windowzDOM: this.windowzDOM || null,
    // };

    this.moveWindowz = this.moveWindowz.bind(this);
    this.bringToFront = this.bringToFront.bind(this);
    this.getWindowzDOM = this.getWindowzDOM.bind(this);

    this.winCssObj = {
      [`.windowz-position-${props.id}`]: {
        position: 'absolute',
        top: '100px',
        left: '100px',
        height: '300px',
        width: '300px',
        'z-index': '0',
      },
    };
    this.windowzPosition = cssobj(this.winCssObj);
  }

  componentWillMount() {
    this.props.updateWindowz(this.props.details, this.winCssObj);
  }

  getWindowzDOM() {
    return this.windowzDOM;
  }

  moveWindowz(event) {
    const windowzPos = this.windowzDOM.getBoundingClientRect();
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

      this.winCssObj[`.windowz-position-${this.props.id}`] = {
        ...this.winCssObj[`.windowz-position-${this.props.id}`],
        top: `${moveTop}px`,
        left: `${moveLeft}px`,
        height: `${windowzPos.height}px`,
        width: `${windowzPos.width}px`,
        'z-index': `${this.winCssObj[`.windowz-position-${this.props.id}`]['z-index']}`,
      };
      this.windowzPosition.update();

      top = moveTop;
      left = moveLeft;
    };

    const mouseUpHandler = () => {
      this.props.updateWindowz(this.props.details, this.winCssObj);

      window.removeEventListener('mousemove', mouseMoveHandler, false);
      window.removeEventListener('mouseup', mouseUpHandler, false);
    };

    window.addEventListener('mousemove', mouseMoveHandler, false);
    window.addEventListener('mouseup', mouseUpHandler, false);
  }

  bringToFront() {
    this.winCssObj[`.windowz-position-${this.props.id}`] = {
      ...this.winCssObj[`.windowz-position-${this.props.id}`],
      'z-index': `${this.props.zIndex}`,
    };
    this.windowzPosition.update();

    this.props.updateWindowz(this.props.details, this.winCssObj);
    this.props.incrementZindex();
  }

  render() {
    // console.log('render windowz!');
    // const windowz = this.props.windowzArray.filter(
    //   w => w.id === this.props.id,
    // )[0];

    return (
      <div
        ref={(c) => { this.windowzDOM = c; }}
        id={this.props.id}
        className={`windowz-container windowz-position-${this.props.id}`}
        onMouseDown={this.bringToFront}
      >
        <WindowzHeader
          moveWindowz={this.moveWindowz}
          details={this.props.details}
        />
        <div className="windowz-body">
          {this.props.details.id}
        </div>
        <WindowzResizer
          id={this.props.details.id}
          direction="right"
          windowzDOM={this.getWindowzDOM}
          winCssObj={this.winCssObj}
          windowzPosition={this.windowzPosition}
        />
        <WindowzResizer
          id={this.props.details.id}
          direction="bottom"
          windowzDOM={this.getWindowzDOM}
          winCssObj={this.winCssObj}
          windowzPosition={this.windowzPosition}
        />
        <WindowzResizer
          id={this.props.details.id}
          direction="left"
          windowzDOM={this.getWindowzDOM}
          winCssObj={this.winCssObj}
          windowzPosition={this.windowzPosition}
        />
        <WindowzResizer
          id={this.props.details.id}
          direction="top"
          windowzDOM={this.getWindowzDOM}
          winCssObj={this.winCssObj}
          windowzPosition={this.windowzPosition}
        />
        <WindowzResizer
          id={this.props.details.id}
          direction="topLeft"
          windowzDOM={this.getWindowzDOM}
          winCssObj={this.winCssObj}
          windowzPosition={this.windowzPosition}
        />
        <WindowzResizer
          id={this.props.details.id}
          direction="topRight"
          windowzDOM={this.getWindowzDOM}
          winCssObj={this.winCssObj}
          windowzPosition={this.windowzPosition}
        />
        <WindowzResizer
          id={this.props.details.id}
          direction="bottomRight"
          windowzDOM={this.getWindowzDOM}
          winCssObj={this.winCssObj}
          windowzPosition={this.windowzPosition}
        />
        <WindowzResizer
          id={this.props.details.id}
          direction="bottomLeft"
          windowzDOM={this.getWindowzDOM}
          winCssObj={this.winCssObj}
          windowzPosition={this.windowzPosition}
        />
        {/* <ResizeLeft windowzDOM={this.getWindowzDOM} />
        <ResizeRight windowzDOM={this.getWindowzDOM} />
        <ResizeTop windowzDOM={this.getWindowzDOM} />
        <ResizeBottom windowzDOM={this.getWindowzDOM} />
        <ResizeTopLeft windowzDOM={this.getWindowzDOM} />
        <ResizeTopRight
          id={this.props.details.id}
          windowzDOM={this.getWindowzDOM}
          winCssObj={this.winCssObj}
          windowzPosition={this.windowzPosition}
        />
        <ResizeBottomLeft windowzDOM={this.getWindowzDOM} />
        <ResizeBottomRight windowzDOM={this.getWindowzDOM} /> */}
      </div>
    );
  }
}

Windowz.propTypes = {
  id: PropTypes.string,
  zIndex: PropTypes.number,
  details: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number,
  ]),
  updateWindowz: PropTypes.func,
  incrementZindex: PropTypes.func,
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    // windowzArray: state.default.windowz,
    zIndex: state.default.zIndex,
  };
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    updateWindowz: (details, winCssobj) => (
      dispatch(actionCreators.updateWindowz(details, winCssobj))
    ),
    incrementZindex: () => dispatch({ type: 'INCREMENT_ZINDEX' }),
  };
};

const WindowzMap = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Windowz);

export default WindowzMap;
