import { Map, View } from "ol";
import { Tile } from "ol/layer";
import { XYZ } from "ol/source";
import { transform } from "ol/proj";

import "./app.css";

const map = new Map({
  target: "map",
  layers: [
    new Tile({
      source: new XYZ({
        url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      }),
    }),
  ],
  view: new View({
    center: [0, 0],
    zoom: 10,
  }),
});

function centerMap(long: number, lat: number) {
  console.log("Long: " + long + " Lat: " + lat);
  map.getView().setCenter(transform([long, lat], "EPSG:4326", "EPSG:3857"));
  map.getView().setZoom(6);
}

centerMap(32.5947657, 49.4441132);
