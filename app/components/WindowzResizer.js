import React from 'react';
import PropTypes from 'prop-types';
import cssobj from 'cssobj';
import { connect } from 'react-redux';

class WindowzResizer extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   style: {
    //     position
    //   },
    // };
    // debugger;

    this.cssobj = {
      '.resizer-position': {
        position: 'absolute',
        top: '0',
        left: '0',
        height: '10px',
        width: '10px',
        cursor: 'nwse-resize',
        background: 'red',
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

    // this.mouseDown = this.mouseDown.bind(this);
  }

  mouseDown() {
    
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
  direction: PropTypes.string,
};

export default WindowzResizer;
