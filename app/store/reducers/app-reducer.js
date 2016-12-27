
const defaultState = {
  windowz: [],
};
let windowz = [];
let index;

const WindowzHandler = (state = defaultState, action) => {
  switch (action.type) {
  case 'UPDATE_WINDOWZ':
    windowz = state.windowz.map((w) => {
      if (w.id === action.value.id) {
        return action.value;
      }
      return w;
    });
    return {
      ...state,
      windowz,
    };
  case 'REMOVE_WINDOWZ':
    state.windowz.forEach((wz, i) => {
      if (wz.id === action.value.id) {
        index = i;
      }
    });
    console.log('REMOVE_WINDOWZ', action.value.id, index);
    let start = state.windowz.slice(0, index);
    let end = state.windowz.slice(index + 1);

    return {
      ...state,
      windowz: [...start, ...end],
    };
  case 'ADD_WINDOWZ':
    return {
      ...state,
      windowz: [...state.windowz, action.value],
    };
  default:
    return {
      ...state,
    };
  }
};

export default WindowzHandler;
