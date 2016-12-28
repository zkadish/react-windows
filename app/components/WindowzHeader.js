import React from 'react';
import { connect } from 'react-redux';

import FontIcon from './FontIcon';

class WindowzHeader extends React.Component {
  constructor(props) {
    super(props);

    // this.state = { ...props.details };

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
    this.props.dispatch({ type: 'UPDATE_WINDOWZ', value: {
      id: details.id,
      header,
      position,
    } });
  }

  closeWindowz() {
    console.log('closeWindowz', this.props.details.id);
    // const windowz = document.getElementById(this.props.details.id);
    // windowz.parentNode.removeChild(windowz);

    this.props.dispatch({ type: 'REMOVE_WINDOWZ', value: this.props.details})
  }

  render() {
    // console.log(this.props.details)

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
          onClick={this.closeWindowz}
          icon="close"
          class="close-icon"
        />
      </div>
    );
  }
}

WindowzHeader.propTypes = {
  moveWindowz: React.PropTypes.func,
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
