import { createTransform } from 'redux-persist';
import { MapState, MyRBush } from './reducers';

const MapTransform = createTransform(
  ({ pokestops }: MapState) => {
    return { pokestops };
  },
  (outboundState: MapState): MapState => {
    return {
      ...outboundState,
      pokestopsTree: new MyRBush().load(Object.values(outboundState.pokestops))
    };
  },
  { whitelist: ['map'] }
);

export default MapTransform;
