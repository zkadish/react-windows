import React from 'react';

function FontIcon(props) {
  const isButton = props.onClick;
  const style = {
    padding: '0',
    background: '30px',
    border: 'none',
  };
  const icon = props.icon;
  const cssClass = props.class || '';

  if (isButton) {
    return (
      <button
        onClick={props.onClick}
        style={style}
        className={cssClass}
      >
        <div className={`fa fa-${icon}`} />
      </button>
    );
  }

  return (
    <div className={`fa fa-${icon} ${style}`} />
  );
}

FontIcon.propTypes = {
  onClick: React.PropTypes.func,
  icon: React.PropTypes.string,
  class: React.PropTypes.string,
};

export default FontIcon;
