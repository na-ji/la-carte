import { Popup } from 'react-leaflet';
import { Icon, icon as createIcon, PointExpression } from 'leaflet';
import { memo } from 'react';

import CanvasMarker from './CanvasMarker';
import { Pokestop } from '../server/entities';

type PokestopMarkerProps = {
  pokestop: Pokestop;
};

function getPokestopIcon(pokestop: Pokestop): Icon {
  let iconName = 'stop';
  let iconSize: PointExpression = [32, 32];
  let iconAnchor: PointExpression = [16, 16];
  let popupAnchor: PointExpression = [0, -16];
  let shadowOptions = {};

  if (pokestop.quest) {
    iconName += '_q';

    if (pokestop.quest.pokemonId) {
      const pokemonId = String(pokestop.quest.pokemonId).padStart(3, '0');

      shadowOptions = {
        shadowUrl: `https://raw.githubusercontent.com/JuneTwooo/PoGoData/master/icons/128/pokemon_icon_${pokemonId}_00.png`,
        shadowSize: [28, 28],
        shadowAnchor: [35, 11]
      };
    }
  }

  return createIcon({
    iconUrl: `images/pokestop/${iconName}.png`,
    iconSize,
    iconAnchor,
    popupAnchor,
    ...shadowOptions
  });
}

function PokestopMarker({ pokestop }: PokestopMarkerProps) {
  return (
    <CanvasMarker
      position={[pokestop.latitude, pokestop.longitude]}
      icon={getPokestopIcon(pokestop)}
    >
      <Popup style="text-align: center;">
        <b>{pokestop.name}</b>
      </Popup>
    </CanvasMarker>
  );
}

function areEqual(
  { pokestop: prevPokestop }: PokestopMarkerProps,
  { pokestop: nextPokestop }: PokestopMarkerProps
): boolean {
  return JSON.stringify(prevPokestop) === JSON.stringify(nextPokestop);
}

export default memo(PokestopMarker, areEqual);
