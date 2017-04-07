import cssobj from 'cssobj';
import * as $ from './vars';

const css = {
  // body: {
  //   background: $.background,
  // },
  // '.create-windowz-container': {
  //   padding: '10px',
  //   width: '150px',
  //   border: `1px solid ${$.bordercolor}`,
  // },
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
    border: '1px solid green',
  },
  '.windowz-header': {
    display: 'flex',
    'align-items': 'center',
    padding: '0 5px',
    height: '30px',
    background: 'seagreen',
    color: '#fff',
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
};

const result = cssobj(css);

export default result;
