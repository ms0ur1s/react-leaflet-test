import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import MarkerClusterGroup from "react-leaflet-cluster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import "leaflet/dist/leaflet.css";
import useSwr from "swr";

const fetcher = (...args) => fetch(...args).then((response) => response.json());

const Map = () => {
  const url =
    "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2022-01";
  const { data, error } = useSwr(url, { fetcher });
  const crimes = data && !error ? data.slice(0, 2000) : [];

  //   if (error) return "An error has occurred.";
  //   if (!data) return "Loading...";

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

  // Test markers
  const markers = [
    {
      geocode: [48.86, 2.3522],
      popUp: "Hello, I am pop up 1",
    },
    {
      geocode: [48.85, 2.3522],
      popUp: "Hello, I am pop up 2",
    },
    {
      geocode: [48.855, 2.34],
      popUp: "Hello, I am pop up 3",
    },
  ];

  return (
    <MapContainer center={[52.6376, -1.13517]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup chunkedLoading>
        {/* {markers.map((marker, index) => (
          <Marker key={index} position={marker.geocode} icon={markerIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))} */}
        {crimes.map((crime, index) => (
          <Marker
            key={index}
            position={[crime.location.latitude, crime.location.longitude]}
            icon={markerIcon}
          >
            <Popup>
              <div>
                <div>{crime.category}</div>
                <div>{crime.month}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default Map;
