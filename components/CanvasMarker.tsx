import { Marker as LeafletMarker } from 'leaflet';
import {
  LeafletProvider,
  MapLayer,
  MarkerProps,
  withLeaflet
} from 'react-leaflet';
import React from 'react';
import { CanvasLayerContext } from './CanvasLayer';

class CanvasMarker<
  P extends MarkerProps = MarkerProps,
  E extends LeafletMarker = LeafletMarker
> extends MapLayer<MarkerProps, LeafletMarker> {
  componentDidMount(): void {
    const { canvasLayerComponent } = this.contextValue as CanvasLayerContext;

    if (!canvasLayerComponent) {
      throw new Error('CanvasMarker cannot be used outside of a CanvasLayer');
    }

    // @ts-ignore
    this.bindLeafletEvents(this._leafletEvents);

    if (this.props.leaflet.map) {
      // @ts-ignore
      if (!this.layerContainer._map) {
        // @ts-ignore
        this.layerContainer._map = this.props.leaflet.map;
      }

      // @ts-ignore
      this.layerContainer.addLayer(this.leafletElement);
    }
  }

  componentWillUnmount(): void {
    super.componentWillUnmount();
  }

  createLeafletElement(props: MarkerProps): LeafletMarker {
    const el = new LeafletMarker(props.position, this.getOptions(props));
    this.contextValue = { ...props.leaflet, popupContainer: el };

    return el;
  }

  updateLeafletElement(fromProps: MarkerProps, toProps: MarkerProps) {
    if (
      toProps.position[0] !== fromProps.position[0] ||
      toProps.position[1] !== fromProps.position[1]
    ) {
      this.leafletElement.setLatLng(toProps.position);
    }
    if (
      JSON.stringify(toProps.icon.options) !==
      JSON.stringify(fromProps.icon.options)
    ) {
      const { canvasLayerComponent } = this.contextValue as CanvasLayerContext;
      this.leafletElement.options.icon = toProps.icon;
      canvasLayerComponent.redraw();
    }
    if (toProps.zIndexOffset !== fromProps.zIndexOffset) {
      this.leafletElement.setZIndexOffset(toProps.zIndexOffset);
    }
    if (toProps.opacity !== fromProps.opacity) {
      this.leafletElement.setOpacity(toProps.opacity);
    }
    if (toProps.draggable !== fromProps.draggable) {
      if (toProps.draggable === true) {
        this.leafletElement.dragging.enable();
      } else {
        this.leafletElement.dragging.disable();
      }
    }
  }

  render() {
    const { children } = this.props;
    return children == null || this.contextValue == null ? null : (
      <LeafletProvider value={this.contextValue}>{children}</LeafletProvider>
    );
  }
}

export default withLeaflet<MarkerProps>(CanvasMarker);
