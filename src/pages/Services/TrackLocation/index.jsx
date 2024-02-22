import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import "./TrackLocation.scss";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { icon, icon2, myloc } from "../../../constants/constants";

// Cordinates of Marcillac
const center = [12.942786, 77.687524];
const purpleOptions = { color: "white" };

function LeafletgeoSearch() {
  const map = useMap();
  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      marker: {
        icon,
      },
    });

    map.addControl(searchControl);

    return () => map.removeControl(searchControl);
  }, []);
  return null;
}

const TrackLocation = () => {
  const [location, setLocation] = useState({
    latitude: 12.958184,
    longitude: 77.6421466,
  });
  useEffect(() => {
    const success = (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };
    const error = () => {
      console.log("Error while accessing location...");
    };
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return (
    <div className="TrackLocation">
      <div id="mapid">
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={16}
          scrollWheelZoom={true}
          style={{ width: "100%", height: "calc(100vh - 4rem)" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker
            position={[location.latitude, location.longitude]}
            icon={icon2}
            className="myloc"
          >
            <Popup className="myloc">You are here</Popup>
          </Marker>
          <LeafletgeoSearch />
        </MapContainer>
      </div>
    </div>
  );
};
export default TrackLocation;
