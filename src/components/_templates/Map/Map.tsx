// Absolute imports
import React from "react";
import { Map, View } from "ol";
import { Tile } from "ol/layer";
import { XYZ } from "ol/source";
import { transform } from "ol/proj";

// Components
import Button from "@shared/Button";
import Dropdown from "@shared/Dropdown";
import Menu from "@shared/Menu";

// Types
import { STATUS, SUPPORTED_ALGORITMS, TMapState, SORT } from "./Map.types";
import { BUTTON_TYPE } from "@shared/Button/Button.types";

// Utils
import { NotificationContext } from "@shared/Notification/Notification";
import { NOTIFICATION_TYPES, TShowNotification } from "@shared/Notification/Notification.types";

class MapTemplate extends React.Component<{ showNotification: TShowNotification }, TMapState> {
  constructor(props: { showNotification: TShowNotification }) {
    super(props);

    this.state = {
      coordinates: "",
    };
  }

  componentDidMount(): void {
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

    centerMap(32.5947657, 49.4441132);

    function centerMap(long: number, lat: number) {
      map.getView().setCenter(transform([long, lat], "EPSG:4326", "EPSG:3857"));
      map.getView().setZoom(6);
    }

    map.on("click", function(event: any) {
      console.log(event.coordinate);
    });
  }

  render() {
    return (
      <div className={SORT.SORT}>
        <Menu>
          <p className={SORT.TITLE}>Украина: Карта преступлений против человечества</p>
        </Menu>
        <div className="menu">
          <h1 className="title">Warmap: Ukraine</h1>
        </div>
        <div id="map" className="map"></div>
        <form>
          <p>Заполните поля ниже:</p>
          <select name="Тип события">
            <option value="murder">Смерть близких/друзей/знакомых</option>
            <option value="murder_uknown">Смерть незнакомого человека</option>
            <option value="civilians_district">Обстрелы жилых районов</option>
            <option value="civilians">Обстрелы гражданских</option>
            <option value="other">Другое</option>
          </select>
          <input placeholder="Ваше ФИО" />
          <input placeholder="Почта для связи" />
          <textarea placeholder="Детальное описание происходящего (опционально)"></textarea>
        </form>
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
