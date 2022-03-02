// Absolute imports
import React from "react";
import { Map, View, Feature } from "ol";
import { Tile, Vector as LayerVector } from "ol/layer";
import { XYZ, Vector as SourceVector } from "ol/source";
import { Style, Icon, Text, Fill, Stroke } from "ol/style";
import { Geometry, Point } from "ol/geom";
import { transform, fromLonLat } from "ol/proj";

// Components
import Button from "@shared/Button";
import Dropdown from "@shared/Dropdown";
import Menu from "@shared/Menu";

// Types
import { TMapState, MAP } from "./Map.types";
import { BUTTON_TYPE } from "@shared/Button/Button.types";

// Utils
import { NotificationContext } from "@shared/Notification/Notification";
import { NOTIFICATION_TYPES, TShowNotification } from "@shared/Notification/Notification.types";

let map: Map = null;

class MapTemplate extends React.Component<{ showNotification: TShowNotification }, TMapState> {
  private markerLayer: LayerVector<SourceVector<Geometry>>;

  constructor(props: { showNotification: TShowNotification }) {
    super(props);

    this.state = {
      map: null,
      x: 0,
      y: 0,
    };

    this.setCenter = this.setCenter.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }

  componentDidMount(): void {
    map = new Map({
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
      }),
    });

    this.centerMap(32.5947657, 49.4441132);
    map.on("singleclick", this.onMapClick);
  }

  centerMap(long: number, lat: number) {
    map.getView().setCenter(transform([long, lat], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(6);
  }

  setCenter() {
    this.centerMap(32.5947657, 49.4441132);
  }

  onMapClick(event) {
    if (this.state.markerLayer) map.removeLayer(this.state.markerLayer);

    this.props.showNotification("Координаты обновлены");

    const marker = new Feature({
      geometry: new Point(event.coordinate),
      type: "accident-point",
      name: "target-point",
    });

    const vectorLayer = new LayerVector({
      source: new SourceVector({
        features: [marker],
      }),
    });

    map.addLayer(vectorLayer);

    this.setState({ markerLayer: vectorLayer });
  }

  render() {
    return (
      <div className={MAP.WRAPPER}>
        <Menu>
          <p className={MAP.TITLE}>Украина: Карта преступлений против человечества</p>
          <Button onClick={this.setCenter}>Отцентровать</Button>
        </Menu>

        <div id="map" className="map"></div>
      </div>
    );
  }
}

const MapComponent = () => (
  <NotificationContext.Consumer>
    {(showNotification: TShowNotification) => <MapTemplate showNotification={showNotification} />}
  </NotificationContext.Consumer>
);

export default MapComponent;
