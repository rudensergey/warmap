import { Geometry } from "ol/geom";
import { Vector } from "ol/layer";
import VectorSource from "ol/source/Vector";

export type TMapState = Readonly<{
  map: null;
  x: number;
  y: number;
  markerLayer?: Vector<VectorSource<Geometry>>;
}>;

export enum MAP {
  WRAPPER = "map__wrapper",
  TITLE = "map__title",
  BOX = "map__box",
  PLACE = "map__place",
}
