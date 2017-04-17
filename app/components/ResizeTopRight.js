import React from 'react';
import { connect } from 'react-redux';
import cssobj from 'cssobj';

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
    const windowzArray = this.props.windowz;
    const ID = this.props.id;
    let top = windowzPos.top;
    let right = window.innerWidth - windowzPos.right;

    const mousemoveHandler = (e) => {
      const topChange = e.clientY - top;
      const moveTop = top + topChange;

      const rightChange = (window.innerWidth - e.clientX) - right;
      const moveRight = right + rightChange;

      // windowzDOM.style.cssText = `position: absolute;
      //                             top: ${moveTop}px;
      //                             right: ${moveRight}px;
      //                             bottom: ${window.innerHeight - windowzPos.bottom}px;
      //                             left: ${windowzPos.left}px;
      //                             z-index: ${windowzDOM.style.zIndex};`;
      // let winCssObj = {};
      // const css = windowzArray.filter((w) => {
      //   return w.id === ID;
      // })[0][`.windowz-position-${ID}`];
      // winCssObj[`.windowz-position-${ID}`] = css;
      // // console.log(winCssObj);
      // // debugger;

      // this.props.winCssObj[`.windowz-position-${ID}`].top = `${moveTop}px`;

      delete this.props.winCssObj[`.windowz-position-${ID}`].height;
      delete this.props.winCssObj[`.windowz-position-${ID}`].width;
      this.props.winCssObj[`.windowz-position-${ID}`].top = `${moveTop}px`;      
      this.props.winCssObj[`.windowz-position-${ID}`].right = `${moveRight}px`;
      this.props.winCssObj[`.windowz-position-${ID}`].bottom = `${window.innerHeight - windowzPos.bottom}px`;
      
      this.props.windowzPosition.update();
      console.log(this.props.winCssObj);
      // const windowzPosition = cssobj(this.winCssObj);
      // windowzPosition.update();
      // console.log(winCssObj);
      // console.log(moveTop, moveRight);

      // this.winCssObj


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
    console.log(this.props.windowz);
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
  windowz: React.PropTypes.arrayOf(React.PropTypes.object),
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
