import keyMirror from 'key-mirror-nested';

const actions = {
  MAP: {
    FETCH_DATA: null,
    SET_DATA: null
  }
};

type Actions = typeof actions;

const actionTypes: Actions = keyMirror(actions, { connChar: '_' });

export const MAP = actionTypes.MAP;
