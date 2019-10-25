import { createSelector } from 'reselect';

export const pokestopsSelector = createSelector(
  ({ map }) => map.pokestopsTree,
  ({ viewConfig }) => viewConfig.bounds,
  (pokestopsTree, bounds) =>
    pokestopsTree.search({
      minX: bounds.southWestLatitude,
      minY: bounds.southWestLongitude,
      maxX: bounds.northEastLatitude,
      maxY: bounds.northEastLongitude
    })
);
