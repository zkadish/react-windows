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
    const position = {
      x: Number(this.inputX.value) || 0,
      y: Number(this.inputY.value) || 0,
    };
    const winodwzOptions = {
      id: Guid.raw(),
      header: {
        title: 'windowz title',
        minmax: 'window-maximize',
      },
      position,
    };

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
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    state,
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

