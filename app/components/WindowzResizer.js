import React from 'react';
import PropTypes from 'prop-types';
import cssobj from 'cssobj';
// import { connect } from 'react-redux';

class WindowzResizer extends React.Component {
  constructor(props) {
    super(props);

    this.cssobj = {
      '.resizer-position': {
        position: 'absolute',
        top: '0',
        left: '0',
        height: '10px',
        width: '10px',
        cursor: 'nwse-resize',
        background: 'red',
        zIndex: '1',
      },
    };
    this.winResizer = cssobj(this.cssobj, {
      local: true,
    });

    switch (props.direction) {
    case 'topRight':
      delete this.cssobj['.resizer-position'].left;
      this.cssobj['.resizer-position'].right = '0';
      this.cssobj['.resizer-position'].cursor = 'nesw-resize';
      break;
    case 'right':
      delete this.cssobj['.resizer-position'].left;
      this.cssobj['.resizer-position'].right = '0';
      this.cssobj['.resizer-position'].bottom = '0';
      delete this.cssobj['.resizer-position'].height;
      this.cssobj['.resizer-position'].width = '3px';
      this.cssobj['.resizer-position'].cursor = 'ew-resize';
      break;
    case 'bottomRight':
      delete this.cssobj['.resizer-position'].left;
      delete this.cssobj['.resizer-position'].top;
      this.cssobj['.resizer-position'].right = '0';
      this.cssobj['.resizer-position'].bottom = '0';
      this.cssobj['.resizer-position'].cursor = 'nwse-resize';
      break;
    case 'bottom':
      delete this.cssobj['.resizer-position'].top;
      this.cssobj['.resizer-position'].right = '0';
      this.cssobj['.resizer-position'].bottom = '0';
      this.cssobj['.resizer-position'].height = '3px';
      delete this.cssobj['.resizer-position'].width;
      this.cssobj['.resizer-position'].cursor = 'ns-resize';
      break;
    case 'bottomLeft':
      delete this.cssobj['.resizer-position'].top;
      this.cssobj['.resizer-position'].bottom = '0';
      this.cssobj['.resizer-position'].cursor = 'nesw-resize';
      break;
    case 'left':
      this.cssobj['.resizer-position'].bottom = '0';
      delete this.cssobj['.resizer-position'].height;
      this.cssobj['.resizer-position'].width = '3px';
      this.cssobj['.resizer-position'].cursor = 'ew-resize';
      break;
    case 'top':
      this.cssobj['.resizer-position'].right = '0';
      delete this.cssobj['.resizer-position'].width;
      this.cssobj['.resizer-position'].height = '3px';
      this.cssobj['.resizer-position'].cursor = 'ns-resize';
      break;
    default:
      break;
    }
    this.winResizer.update();

    this.mouseDown = this.mouseDown.bind(this);
  }

  mouseDown() {
    const windowzDOM = this.props.windowzDOM();
    const windowzPos = windowzDOM.getBoundingClientRect();
    const ID = this.props.id;
    let top = windowzPos.top;
    let right = window.innerWidth - windowzPos.right;
    let bottom = window.innerHeight - windowzPos.bottom;
    let left = windowzPos.left;

    const mousemoveHandler = (e) => {
      const direction = this.props.direction.toLowerCase();
      const winCssObj = this.props.winCssObj[`.windowz-position-${ID}`];
      let topChange = null;
      let moveTop = null;
      let rightChange = null;
      let moveRight = null;
      let bottomChange = null;
      let moveBottom = null;
      let leftChange = null;
      let moveLeft = null;

      if (direction.includes('top')) {
        topChange = e.clientY - top;
        moveTop = top + topChange;
      }

      if (direction.includes('right')) {
        rightChange = (window.innerWidth - e.clientX) - right;
        moveRight = right + rightChange;
      }

      if (direction.includes('bottom')) {
        bottomChange = (window.innerHeight - e.clientY) - bottom;
        moveBottom = bottom + bottomChange;
      }

      if (direction.includes('left')) {
        leftChange = e.clientX - left;
        moveLeft = left + leftChange;
      }

      delete winCssObj.height;
      delete winCssObj.width;
      winCssObj.top = `${moveTop || windowzPos.top}px`;
      winCssObj.right = `${moveRight || window.innerWidth - windowzPos.right}px`;
      winCssObj.bottom = `${moveBottom || window.innerHeight - windowzPos.bottom}px`;
      winCssObj.left = `${moveLeft || windowzPos.left}px`;

      this.props.windowzPosition.update();

      top = moveTop;
      right = moveRight;
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
    // debugger;
    return (
      <div
        className={this.winResizer.mapClass('resizer-position').trim()}
        onMouseDown={this.mouseDown}
      />
    );
  }
}

WindowzResizer.propTypes = {
  windowzDOM: PropTypes.func,
  id: PropTypes.string,
  winCssObj: PropTypes.obj,
  direction: PropTypes.string,
  windowzPosition: PropTypes.obj,
};

export default WindowzResizer;
