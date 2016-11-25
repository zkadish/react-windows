import React from 'react';
import { connect } from 'react-redux';
import * as Action from '../store/actions/app-actions';

class Form extends React.Component {
  constructor(props) {
    super(props)

    this.changeText = this.changeText.bind(this);
  }

  changeText() {
    const inputText = this.refs.inputText.value;
    this.props.updateApp(inputText);
  }

  render() {
    return(
      <div>
        <form>
          <input
            ref="inputText"
            type="text"
            placeholder="type stuff" />
          <div
            onClick={this.changeText}
          >
            submit
          </div>
        </form>
        <div ref="output">
          {this.props.updateAppState}
        </div>
      </div>
    )
  }
}

const mapStateToProps = function mapStateToProps(state) {
  return {
    updateAppState: state.appState.updateAppState
  }
}

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    updateApp: (string) => { dispatch(Action.UPDATE_APP_STATE(string)) }
  }
}

const FormMap = connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);

export default FormMap;
