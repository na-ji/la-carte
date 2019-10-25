import { handleActions } from 'redux-actions';

import { MAP } from './action-types';
import { LocationRBush } from '../../location-r-bush';

const initialState = {
  pokestops: {},
  pokestopsTree: new LocationRBush()
};

export type MapState = typeof initialState;

export default handleActions(
  {
    [MAP.SET_DATA]: (state, { payload }) => {
      const pokestops = {
        ...state.pokestops,
        ...payload.pokestops.reduce((pokestops, pokestop) => {
          pokestops[pokestop.id] = pokestop;

          return pokestops;
        }, {})
      };

      return {
        ...state,
        pokestops,
        pokestopsTree: new LocationRBush().load(Object.values(pokestops))
      };
    }
  },
  initialState
);
