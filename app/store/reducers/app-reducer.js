
const defaultState = {
  updateAppState: 'Hello World',
}


export function appState (state = defaultState, action) {
  switch(action.type) {
    case 'UPDATE_APP_STATE':
      return {
        ...state,
        updateAppState: action.value
      };
    default:
      return {
        ...state
      };
  }
}
