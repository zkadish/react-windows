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
    let style = { ...this.props.details.style };

    if (details.header.minmax === 'window-maximize') {
      header = { ...header, minmax: 'window-minimize' };
      style = { ...style, height: this.previousHeight };
    } else {
      this.previousHeight = this.props.details.style.height;
      header = { ...header, minmax: 'window-maximize' };
      style = { ...style, height: '30px' };
    }
    this.props.dispatch({
      type: 'UPDATE_WINDOWZ',
      value: {
        id: details.id,
        header,
        style,
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
