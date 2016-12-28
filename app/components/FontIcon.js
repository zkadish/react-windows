import React from 'react';

function FontIcon(props) {
  const isButton = props.onClick;
  const btnStyle = {
    padding: '0',
    background: 'none',
    border: 'none',
    outline: 'none',
  };
  const icon = props.icon;
  const cssClass = props.class || '';

  if (isButton) {
    return (
      <button
        onClick={props.onClick}
        style={btnStyle}
      >
        <div className={`fa fa-${icon} ${cssClass}`} />
      </button>
    );
  }

  return (
    <div className={`fa fa-${icon} ${cssClass}`} />
  );
}

FontIcon.propTypes = {
  onClick: React.PropTypes.func,
  icon: React.PropTypes.string,
  class: React.PropTypes.string,
};

export default FontIcon;
