import { useState } from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import TourList, { toursLoader } from "./components/TourList";
import TourPage, { tourLoader } from "./components/TourPage/TourPage";
import NotFound from "./components/NotFound";

import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    photo: "",
  });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<TourList />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<SignupPage />} />

        <Route path="tour">
          <Route path=":slug" element={<TourPage />} loader={tourLoader} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} user={user} />
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
};

export default App;
