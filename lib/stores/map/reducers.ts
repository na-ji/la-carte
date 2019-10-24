import { handleActions } from 'redux-actions';
import RBush from 'rbush';

import { MAP } from './action-types';

// TODO : to extract
export class MyRBush extends RBush {
  toBBox({ latitude, longitude }) {
    return { minX: latitude, minY: longitude, maxX: latitude, maxY: longitude };
  }

  compareMinX(a, b) {
    return a.latitude - b.latitude;
  }

  compareMinY(a, b) {
    return a.longitude - b.longitude;
  }

  load(data): MyRBush {
    return super.load(data);
  }
}

const initialState = {
  pokestops: {},
  pokestopsTree: new MyRBush()
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

      console.log({ pokestops: Object.keys(pokestops).length });

      return {
        ...state,
        pokestops,
        pokestopsTree: new MyRBush().load(Object.values(pokestops))
      };
    }
  },
  initialState
);
