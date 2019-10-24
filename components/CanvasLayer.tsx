import CanvasIconLayer from 'leaflet-canvas-marker/src/plugin/leaflet.canvas-markers';
import { withLeaflet, MapLayer, MapLayerProps } from 'react-leaflet';

class CanvasLayer extends MapLayer {
  createLeafletElement(props: MapLayerProps): CanvasIconLayer {
    const el = new CanvasIconLayer({
      ...this.getOptions(props),
      debug: false
    });
    this.contextValue = { ...props.leaflet, layerContainer: el };

    return el;
  }
}

export default withLeaflet(CanvasLayer);
