import { useQuery } from '@apollo/react-hooks';
import { MutableRefObject, useRef, Fragment, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { Map, TileLayer } from 'react-leaflet';
import { useDebouncedCallback } from 'use-debounce';

import { RAW_DATA_QUERY } from '../lib/queries';
import CanvasLayer from './CanvasLayer';
import PokestopMarker from './PokestopMarker';
import { useLocalStorage } from '../lib/hooks';

const rawDataQueryVars = coords => ({
  pokemonArgs: {
    ...coords
  },
  pokestopArgs: {
    ...coords
  }
});

export default function() {
  const [viewConfig, setViewConfig] = useLocalStorage('viewConfig', {
    centerLatitude: 48.83959,
    centerLongitude: 2.717067,
    zoom: 16,
    bounds: {
      southWestLatitude: 48.82379,
      southWestLongitude: 2.69057,
      northEastLatitude: 48.84884,
      northEastLongitude: 2.75057
    }
  });

  const mapProps: MutableRefObject<{}> = useRef({
    center: [viewConfig.centerLatitude, viewConfig.centerLongitude],
    zoom: viewConfig.zoom,
    maxZoom: 19
  });
  useEffect(() => {
    mapProps.current = {
      center: [viewConfig.centerLatitude, viewConfig.centerLongitude],
      zoom: viewConfig.zoom,
      maxZoom: 19
    };
  }, []);

  const [debouncedSetViewConfig] = useDebouncedCallback(
    // function
    value => {
      setViewConfig(value);
    },
    // delay in ms
    1000
  );

  const { data } = useQuery(RAW_DATA_QUERY, {
    variables: rawDataQueryVars(viewConfig.bounds)
    //pollInterval: 2000
  });

  const mapRef: MutableRefObject<Map> = useRef(null);

  let pokestops = [];
  if (typeof data !== 'undefined') {
    pokestops = data.pokestops;
  }

  const updateBounds = () => {
    const mapElement = mapRef.current.leafletElement;

    debouncedSetViewConfig({
      centerLatitude: mapElement.getCenter().lat,
      centerLongitude: mapElement.getCenter().lng,
      zoom: mapElement.getZoom(),
      bounds: {
        southWestLatitude: parseFloat(
          mapElement
            .getBounds()
            .getSouthWest()
            .lat.toFixed(5)
        ),
        southWestLongitude: parseFloat(
          mapElement
            .getBounds()
            .getSouthWest()
            .lng.toFixed(5)
        ),
        northEastLatitude: parseFloat(
          mapElement
            .getBounds()
            .getNorthEast()
            .lat.toFixed(5)
        ),
        northEastLongitude: parseFloat(
          mapElement
            .getBounds()
            .getNorthEast()
            .lng.toFixed(5)
        )
      }
    });
  };

  return (
    <Fragment>
      {/*
      // @ts-ignore */}
      <Map
        {...mapProps.current}
        onMoveend={updateBounds}
        onResize={updateBounds}
        onZoomend={updateBounds}
        id="mapid"
        style={{ height: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CanvasLayer>
          {pokestops.map(pokestop => (
            <PokestopMarker
              key={`pokestop-${pokestop.id}`}
              pokestop={pokestop}
            />
          ))}
        </CanvasLayer>
      </Map>
    </Fragment>
  );
}
