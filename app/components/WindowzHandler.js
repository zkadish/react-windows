import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Windowz from './Windowz';

function WindowzHandler(props) {
  return (
    <div id="windowz-handler">
      { props.windowz.map((w, i) =>
        <Windowz
          id={w.id}
          details={w}
          key={i}
        />,
      )}
    </div>
  );
}

WindowzHandler.propTypes = {
  windowz: PropTypes.arrayOf(React.PropTypes.object),
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
