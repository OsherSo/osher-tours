import React, { useEffect, useRef } from "react";
import L from "leaflet";

import pinIconUrl from "./pin.png";

const TourMap = ({ locations }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = L.map(mapRef.current, { zoomControl: false });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const greenIcon = L.icon({
      iconUrl: pinIconUrl,
      iconSize: [32, 40],
      iconAnchor: [16, 45],
      popupAnchor: [0, -50],
    });

    const points = [];
    locations.forEach((loc) => {
      points.push([loc.coordinates[1], loc.coordinates[0]]);
      L.marker([loc.coordinates[1], loc.coordinates[0]], { icon: greenIcon })
        .addTo(map)
        .bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`, {
          autoClose: false,
        })
        .openPopup();
    });

    const bounds = L.latLngBounds(points).pad(0.5);
    map.fitBounds(bounds);
    map.scrollWheelZoom.disable();

    return () => {
      map.remove();
    };
  }, [locations]);

  return <section className="section-map" ref={mapRef}></section>;
};

export default TourMap;
