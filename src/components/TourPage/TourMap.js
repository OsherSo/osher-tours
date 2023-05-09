import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const TourMap = ({ locations }) => {
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoib3NoZXJzbyIsImEiOiJjbGg2b2M3NGQwN3doM2dub3ZnNGYzMnZiIn0.eakq8L8UouCrnKfctM5ZaQ";

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/jonasschmedtmann/cjvi9q8jd04mi1cpgmg7ev3dy",
      scrollZoom: false,
    });

    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach((loc) => {
      // Create marker
      const el = document.createElement("div");
      el.className = "marker";

      // Add marker
      new mapboxgl.Marker({
        element: el,
        anchor: "bottom",
      })
        .setLngLat(loc.coordinates)
        .addTo(map);

      // Add popup
      new mapboxgl.Popup({
        offset: 30,
      })
        .setLngLat(loc.coordinates)
        .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
        .addTo(map);

      // Extend map bounds to include current location
      bounds.extend(loc.coordinates);
    });

    map.fitBounds(bounds, {
      padding: {
        top: 200,
        bottom: 150,
        left: 100,
        right: 100,
      },
    });

    return () => {
      map.remove();
    };
  }, [locations]);

  return (
    <section className="section-map">
      <div id="map" />
    </section>
  );
};

export default TourMap;
