import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import MarkerClusterGroup from "react-leaflet-cluster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import "leaflet/dist/leaflet.css";

// Function to generate random markers
const generateMarkers = (count) => {
  const minLat = -55,
    rangeLat = 125,
    rangeLng = 345,
    minLng = -170;

  return Array.from({ length: count }, (v, k) => ({
    latitude: minLat + Math.random() * rangeLat,
    longitude: minLng + Math.random() * rangeLng,
    category: `Category ${k % 5}`, // Example category
    month: `2022-0${(k % 12) + 1}`, // Example month
  }));
};

const MapTwo = () => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const generatedMarkers = generateMarkers(30000); // Generate 2000 markers
    setMarkers(generatedMarkers);
  }, []);

  // Custom marker icon markup
  const markerIconMarkup = renderToStaticMarkup(
    <FontAwesomeIcon icon={faLocationDot} />
  );

  // Custom marker icon
  const markerIcon = divIcon({
    className: "marker-icon",
    html: markerIconMarkup,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });

  if (!markers.length) return <div>Loading...</div>;

  return (
    <MapContainer center={[0, 0]} zoom={2} preferCanvas={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        noWrap={true}
      />
      <MarkerClusterGroup chunkedLoading>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={[marker.latitude, marker.longitude]}
            icon={markerIcon}
          >
            <Popup>
              <div>
                <div>{marker.category}</div>
                <div>{marker.month}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default MapTwo;
