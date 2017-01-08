import React from 'react';
import { connect } from 'react-redux';

import FontIcon from './FontIcon';

class WindowzHeader extends React.Component {
  constructor(props) {
    super(props);

    this.toggleMinMax = this.toggleMinMax.bind(this);
    this.closeWindowz = this.closeWindowz.bind(this);
  }

  toggleMinMax() {
    const details = { ...this.props.details };
    let header = { ...this.props.details.header };
    let position = { ...this.props.details.position };

    if (details.header.minmax === 'window-maximize') {
      header = { ...header, minmax: 'window-minimize' };
      position = { ...position, height: '55px' };
    } else {
      header = { ...header, minmax: 'window-maximize' };
      position = { ...position, height: '300px' };
    }
    this.props.dispatch({
      type: 'UPDATE_WINDOWZ',
      value: {
        id: details.id,
        header,
        position,
      } });
  }

  closeWindowz() {
    this.props.dispatch({
      type: 'REMOVE_WINDOWZ',
      value: this.props.details,
    });
  }

  render() {
    return (
      <div
        className="windowz-header"
        onMouseDown={this.props.moveWindowz}
      >
        <div className="title">
          header
        </div>
        <FontIcon
          icon={this.props.details.header.minmax}
          class="minmax-icon"
          onClick={this.toggleMinMax}
        />
        <FontIcon
          icon="close"
          class="close-icon"
          onClick={this.closeWindowz}
        />
      </div>
    );
  }
}

WindowzHeader.propTypes = {
  dispatch: React.PropTypes.func,
  moveWindowz: React.PropTypes.func,
  details: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]),
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

const WindowzHeaderMap = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WindowzHeader);

export default WindowzHeaderMap;
