import keyMirror from 'key-mirror-nested';

const actions = {
  VIEW_CONFIG: {
    SET: null
  }
};

type Actions = typeof actions;

const actionTypes: Actions = keyMirror(actions, { connChar: '_' });

export const VIEW_CONFIG = actionTypes.VIEW_CONFIG;
