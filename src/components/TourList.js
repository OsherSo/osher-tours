import { useLoaderData } from "react-router-dom";
import TourCard from "./TourCard";

export const toursLoader = async () => {
  const res = await fetch("http://localhost:8000/api/v1/tours");
  return res.json();
};

const TourList = () => {
  const tours = useLoaderData().data;

  return (
    <main className="main">
      <div className="card-container">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </main>
  );
};

export default TourList;
