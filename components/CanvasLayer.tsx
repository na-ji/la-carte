import CanvasIconLayer from 'leaflet-canvas-marker/src/plugin/leaflet.canvas-markers';
import {
  withLeaflet,
  MapLayer,
  MapLayerProps,
  LeafletContext
} from 'react-leaflet';

export interface CanvasLayerContext extends LeafletContext {
  canvasLayerComponent: CanvasLayer;
}

class CanvasLayer extends MapLayer {
  redrawTimeoutId?: NodeJS.Timeout;

  constructor(props) {
    super(props);
    this.redrawTimeoutId = null;
  }

  createLeafletElement(props: MapLayerProps): CanvasIconLayer {
    const el = new CanvasIconLayer({
      ...this.getOptions(props),
      debug: false
    });

    this.contextValue = {
      ...props.leaflet,
      layerContainer: el,
      // @ts-ignore
      canvasLayerComponent: this
    };

    return el;
  }

  redraw() {
    const canvasLayer = this.leafletElement as CanvasIconLayer;

    if (this.redrawTimeoutId) {
      clearTimeout(this.redrawTimeoutId);
      this.redrawTimeoutId = null;
    }

    this.redrawTimeoutId = setTimeout(() => {
      canvasLayer.redraw();
    }, 100);
  }
}

export default withLeaflet(CanvasLayer);
