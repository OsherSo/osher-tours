import { useLoaderData } from "react-router-dom";

import TourHeader from "./TourHeader";
import TourDescription from "./TourDescription";
import TourPictures from "./TourPictures";
import TourFooter from "./TourFooter";
import TourMap from "./TourMap";

export const tourLoader = async ({ params }) => {
  const { slug } = params;
  const res = await fetch(`http://localhost:8000/api/v1/tours?slug=${slug}`);
  return res.json();
};

const TourPage = () => {
  const tour = useLoaderData().data[0];

  return (
    <div>
      <TourHeader tour={tour} />
      <TourDescription tour={tour} />
      <TourPictures tour={tour} />
      <TourMap locations={tour.locations} />
      <TourFooter tour={tour} />
    </div>
  );
};

export default TourPage;
