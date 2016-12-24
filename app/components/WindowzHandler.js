import React from 'react';
import { connect } from 'react-redux';
// import * as Action from '../store/actions/app-actions';

import Windowz from './Windowz';

class WindowzHandler extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('WindowzHandler: render():', this.props.windowz);

    const windowz = this.props.windowz.map((w, i) => {
      return (
        <Windowz
          id={w.id}
          header={w.header}
          key={i}
        />
      );
    });

    return (
      <div id="windowz-handler">
        { windowz }
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
