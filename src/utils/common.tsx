import { Feature } from "ol";
import { Vector as LayerVector } from "ol/layer";
import { Vector as SourceVector } from "ol/source";
import { Style, Icon } from "ol/style";
import { Point } from "ol/geom";

export function getMarkerLayer(coordinate: number[]) {
  const marker = new Feature({
    geometry: new Point(coordinate),
    type: "target-point",
    name: "target-point",
  });

  const vectorLayer = new LayerVector({
    source: new SourceVector({
      features: [marker],
    }),

    style: new Style({
      image: new Icon({
        displacement: [0, 400],
        anchor: [0.5, -0.5],
        anchorXUnits: "fraction",
        anchorYUnits: "pixels",
        src: "marker.png",
        scale: [0.1, 0.1],
      }),
    }),
  });

  return vectorLayer;
}
