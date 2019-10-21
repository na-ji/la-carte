import { useQuery } from '@apollo/react-hooks';
import { useEffect, useRef, useState } from 'react';
import L, { Map } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import CanvasIconLayer from 'leaflet-canvas-marker/src/plugin/leaflet.canvas-markers';

import { RAW_DATA_QUERY } from '../lib/queries';

const rawDataQueryVars = coords => ({
  pokemonArgs: {
    ...coords
  },
  pokestopArgs: {
    ...coords
  }
});

export default function() {
  const [coords, setCoords] = useState({
    southWestLatitude: 48.82379,
    southWestLongitude: 2.69057,
    northEastLatitude: 48.84884,
    northEastLongitude: 2.75057
  });

  const { data } = useQuery(RAW_DATA_QUERY, {
    variables: rawDataQueryVars(coords)
    //pollInterval: 2000
  });

  const mapRef: { current: Map } = useRef(null);
  const layerRef = useRef(null);

  useEffect(() => {
    mapRef.current = L.map('mapid').setView([48.83959, 2.717067], 16);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(mapRef.current);

    const updateBounds = () => {
      setCoords({
        southWestLatitude: parseFloat(
          mapRef.current
            .getBounds()
            .getSouthWest()
            .lat.toFixed(5)
        ),
        southWestLongitude: parseFloat(
          mapRef.current
            .getBounds()
            .getSouthWest()
            .lng.toFixed(5)
        ),
        northEastLatitude: parseFloat(
          mapRef.current
            .getBounds()
            .getNorthEast()
            .lat.toFixed(5)
        ),
        northEastLongitude: parseFloat(
          mapRef.current
            .getBounds()
            .getNorthEast()
            .lng.toFixed(5)
        )
      });
    };

    mapRef.current.on('resize moveend zoomend', updateBounds);

    layerRef.current = CanvasIconLayer({}).addTo(mapRef.current);
  }, []);

  let pokestops = [];
  if (typeof data !== 'undefined') {
    pokestops = data.pokestops;
  }

  const upscaleModifier = 1;
  const PokestopIcon = L.icon({
    iconUrl: 'images/pokestop/stop.png',
    iconSize: [32 * upscaleModifier, 32 * upscaleModifier],
    iconAnchor: [16 * upscaleModifier, 32 * upscaleModifier],
    popupAnchor: [0, -16 * upscaleModifier]
  });

  useEffect(() => {
    layerRef.current.clearLayers();

    pokestops.forEach(pokestop => {
      layerRef.current.addMarker(
        L.marker([pokestop.latitude, pokestop.longitude], {
          icon: PokestopIcon
        })
      );
    });
  }, [pokestops]);

  return <div key="map" id="mapid" style={{ height: '100%' }} />;
}
