import React from 'react';
import { connect } from 'react-redux';

import Guid from 'guid';

class CreateWindowz extends React.Component {
  constructor() {
    super();

    this.state = {
      windowzX: '',
      windowzY: '',
    };

    this.createWindowz = this.createWindowz.bind(this);
  }

  createWindowz() {
    const winodwzOptions = {
      id: Guid.raw(),
      header: {
        title: 'windowz title',
        minmax: 'window-maximize',
      },
      style: {
        position: 'absolute',
        top: `${Number(this.inputY.value) || 100}px`,
        left: `${Number(this.inputX.value) || 100}px`,
        height: `${Number(this.inputHeight.value) || 300}px`,
        width: `${Number(this.inputWidth.value) || 300}px`,
        zIndex: `${this.props.zIndex}`,
      },
    };

    this.props.dispatch({
      type: 'INCREMENT_ZINDEX',
    });

    this.props.dispatch({
      type: 'ADD_WINDOWZ',
      value: winodwzOptions,
    });
  }

  render() {
    return (
      <div className="create-windowz-container">
        <div>
          Create Windowz
        </div>
        <div>
          x:
          <input
            ref={(c) => { this.inputX = c; }}
            type="text"
          />
        </div>
        <div>
          y:
          <input
            ref={(c) => { this.inputY = c; }}
            type="text"
          />
        </div>
        <div>
          h:
          <input
            ref={(c) => { this.inputHeight = c; }}
            type="text"
          />
        </div>
        <div>
          w:
          <input
            ref={(c) => { this.inputWidth = c; }}
            type="text"
          />
        </div>
        <button
          className="create-windowz-button"
          onClick={this.createWindowz}
        >
          create
        </button>
      </div>
    );
  }
}

CreateWindowz.propTypes = {
  dispatch: React.PropTypes.func,
  zIndex: React.PropTypes.number,
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    zIndex: state.default.zIndex,
  };
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
};

const CreateWindowzMap = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateWindowz);

export default CreateWindowzMap;

