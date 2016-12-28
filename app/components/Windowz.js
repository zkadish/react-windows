import React from 'react';
import { connect } from 'react-redux';

import WindowzHeader from './WindowzHeader';

class Windowz extends React.Component {
  constructor(props) {
    super(props);

    this.moveWindowz = this.moveWindowz.bind(this);
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
          position: 'absolute',
          top: windowzPos.top,
          left: windowzPos.left,
          height: windowzPos.height,
          width: windowzPos.width,
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
    console.log('Windowz render()', this.props.windowzArray);
    // get "this" window from windowz array
    const windowz = this.props.windowzArray.filter(
      w => w.id === this.props.id,
    )[0];

    return (
      <div
        ref={(c) => { this.windowzDOM = c; }}
        id={this.props.id}
        className="windowz-container"
        style={windowz.position}
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
