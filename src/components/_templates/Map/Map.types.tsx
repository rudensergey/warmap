import { Map } from "ol";

export type TMapState = Readonly<{
  map: null;
  coordinates: null;
}>;

export enum MAP {
  WRAPPER = "map__wrapper",
  TITLE = "map__title",
  BOX = "map__box",
}
