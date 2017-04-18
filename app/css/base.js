import cssobj from 'cssobj';
import * as $ from './vars';

const css = {
  '.create-windowz-button': {
    padding: '5px',
    margin: '5px',
    border: '1px solid #ccc',
  },
  '.windowz-container': {
    'user-select': 'none',
    'box-sizing': 'border-box',
    overflow: 'hidden',
    background: 'palegreen',
  },
  '.windowz-header': {
    display: 'flex',
    'align-items': 'center',
    padding: '0 5px',
    height: '30px',
    background: 'seagreen',
    color: '#fff',
    border: '1px solid seagreen',
    '.title': {
      flex: '1',
    },
    '.minmax-icon': {
      margin: '0 5px 0 0',
      'font-size': '14px',
      color: '#fff',
    },
    '.close-icon': {
      margin: '0 5px 0 0',
      'font-size': '16px',
      color: '#fff',
    },
  },
  '.windowz-body': {
    position: 'absolute',
    top: '30px',
    right: '0',
    bottom: '0',
    left: '0',
    border: '1px solid seagreen',
  },
};

const result = cssobj(css);

export default result;
