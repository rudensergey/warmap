// Absolute imports
import React, { DetailedHTMLProps, HTMLAttributes, MouseEventHandler } from "react";
import { Map, View } from "ol";
import { Tile } from "ol/layer";
import { XYZ } from "ol/source";
import { transform } from "ol/proj";

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

class MapTemplate extends React.Component<{ showNotification: TShowNotification }, TMapState> {
  private map: Map;
  private coordinates: string;

  constructor(props: { showNotification: TShowNotification }) {
    super(props);

    this.state = {
      map: null,
      coordinates: null,
    };

    this.setCenter = this.setCenter.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }

  componentDidMount(): void {
    this.map = new Map({
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
    this.map.on("singleclick", this.onMapClick);
  }

  centerMap(long: number, lat: number) {
    this.map.getView().setCenter(transform([long, lat], "EPSG:4326", "EPSG:3857"));
    this.map.getView().setZoom(6);
  }

  setCenter() {
    this.centerMap(32.5947657, 49.4441132);
  }

  onMapClick(event) {
    console.log(event.coordinate);
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
