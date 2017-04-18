import * as ACTION from './action-types';

export const updateWindowz = (details, winCssobj) => {
  const value = {
    ...details,
    [`.windowz-position-${details.id}`]: {
      ...winCssobj[`.windowz-position-${details.id}`],
    },
  };
  return { type: ACTION.UPDATE_WINDOWZ, value };
};

export const updateAppState = value => ({
  type: 'UPDATE_APP_STATE',
  value,
});

export default updateAppState;
