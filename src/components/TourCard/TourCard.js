import Header from "./Header";
import Details from "./Details";
import Footer from "./Footer";

const TourCard = ({ tour }) => {
  return (
    <div className="card">
      <Header />
      <Details />
      <Footer />
    </div>
  );
};

export default TourCard;
