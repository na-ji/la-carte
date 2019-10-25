import { createTransform } from 'redux-persist';
import { MapState } from './reducers';
import { LocationRBush } from '../../location-r-bush';

const MapTransform = createTransform(
  ({ pokestops }: MapState) => {
    Object.keys(pokestops).forEach(pokestopId => {
      delete pokestops[pokestopId].quest;
    });
    return { pokestops };
  },
  (outboundState: MapState): MapState => {
    return {
      ...outboundState,
      pokestopsTree: new LocationRBush().load(
        Object.values(outboundState.pokestops)
      )
    };
  },
  { whitelist: ['map'] }
);

export default MapTransform;
