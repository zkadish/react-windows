
const defaultState = {
  windowz: [],
};

let index;

const WindowzHandler = (state = defaultState, action) => {
  switch (action.type) {
  case 'REMOVE_WINDOWZ':
    state.windowz.forEach((wz, i) => {
      if (wz === action.value.id) {
        index = i;
      }
    });
    return {
      ...state,
      windowz: [...state.windowz.slice(0, index), ...state.windowz.slice(index + 1)],
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
