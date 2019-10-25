import { createTransform } from 'redux-persist';
import { MapState } from './reducers';
import { LocationRBush } from '../../location-r-bush';

const MapTransform = createTransform(
  ({ pokestops }: MapState) => {
    const savedPokestops = Object.keys(pokestops).reduce(
      (savedPokestops, pokestopId) => {
        savedPokestops[pokestopId] = {
          ...pokestops[pokestopId],
          quest: undefined
        };

        return savedPokestops;
      },
      {}
    );

    return { pokestops: savedPokestops };
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
