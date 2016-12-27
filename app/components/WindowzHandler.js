import React from 'react';
import { connect } from 'react-redux';
// import * as Action from '../store/actions/app-actions';

import Windowz from './Windowz';

class WindowzHandler extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      windowz: [...this.props.windowz],
    };
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    if (this.props !== nextProps) {
      this.setState({ windowz: nextProps.windowz });
    }
  }

  render() {
    console.log('WindowzHandler: render():', this.props.windowz);

    // const windowz = this.props.windowz.map((w, i) => {
    //   return (
    //     <Windowz
    //       id={w.id}
    //       details={w}
    //       position={w.position}
    //       key={i}
    //     />
    //   );
    // });

    // console.log('WindowzHandler: render():', windowz);

    return (
      <div id="windowz-handler">
        { this.state.windowz.map((w, i) => {
          return (
            <Windowz
              id={w.id}
              details={w}
              position={w.position}
              key={i}
            />
          )
        }) }
      </div>
    );
  }
}

WindowzHandler.propTypes = {
  windowz: React.PropTypes.arrayOf(React.PropTypes.object),
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    windowz: state.default.windowz,
  };
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
};

const WindowzHandlerMap = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WindowzHandler);

export default WindowzHandlerMap;
