import React from 'react';
import { connect } from 'react-redux';

import WindowzHeader from './WindowzHeader';

class Windowz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      style: {
        position: 'absolute',
        top: `${props.details.position.x || 100}px`,
        left: `${props.details.position.y || 100}px`,
        height: '300px',
        width: '300px',
      },
    };

    this.moveWindowz = this.moveWindowz.bind(this);
  }

  componentDidMount() {
    console.log('Windowz componentDidMount', this.windowzDOM);
  }

  componentWillUnmount() {
    // console.log('componentWillUnmount', this.props.details.id);
    // this.props.dispatch({ type: 'REMOVE_WINDOWZ', value: this.props.details})
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
    this.setState({
      style: {
        position: 'absolute',
        top: nextProps.position.y,
        left: nextProps.position.x,
        height: '300px',
        width: '300px',
      },
    });
  }

  moveWindowz(event) {
    let windowzPos = this.windowzDOM.getBoundingClientRect();
    let top = windowzPos.top;
    const offSetTop = windowzPos.top - event.clientY;
    let left = windowzPos.left;
    const offSetLeft = windowzPos.left - event.clientX;

    const mouseMoveHandler = (e) => {
      const changeTop = e.clientY - top;
      const moveTop = (top + offSetTop) + changeTop;

      const changeLeft = e.clientX - left;
      const moveLeft = (left + offSetLeft) + changeLeft;

      this.windowzDOM.style.cssText = `position: absolute;
                                       top: ${moveTop}px;
                                       left: ${moveLeft}px;
                                       height: ${windowzPos.height}px;
                                       width: ${windowzPos.width}px`;

      top = moveTop;
      left = moveLeft;
    };

    const mouseUpHandler = () => {
      windowzPos = this.windowzDOM.getBoundingClientRect();
      const details = {
        ...this.props.details,
        position: {
          x: windowzPos.left,
          y: windowzPos.top,
        },
      };
      this.props.dispatch({ type: 'UPDATE_WINDOWZ', value: details });

      window.removeEventListener('mousemove', mouseMoveHandler, false);
      window.removeEventListener('mouseup', mouseUpHandler, false);
    };

    window.addEventListener('mousemove', mouseMoveHandler, false);
    window.addEventListener('mouseup', mouseUpHandler, false);
  }

  render() {
    console.log('Windowz render()', this.state.style);
    console.log('windowz render()', this.windowzDOM);
    
    if (this.windowzDOM) {
      // this.windowzDOM.removeAttribute('style');
    }
    // console.log('windowz render()', this.windowzDOM);
    
    return (
      <div
        ref={(c) => { this.windowzDOM = c; }}
        id={this.props.id}
        className="windowz-container"
        style={this.state.style}
      >
        <WindowzHeader
          moveWindowz={this.moveWindowz}
          details={this.props.details}
        />
        <div>
          {this.props.details.id}
        </div>
      </div>
    );
  }
}

Windowz.propTypes = {
  dispatch: React.PropTypes.func,
  id: React.PropTypes.string,
  details: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
    React.PropTypes.number,
  ]),
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
};

const WindowzMap = connect(
  null,
  mapDispatchToProps,
)(Windowz);

export default WindowzMap;
