import { useState } from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import LoginPage from "./components/authentication/LoginPage";
import SignupPage from "./components/authentication/SignupPage";
import Overview from "./components/Overview";
import TourPage from "./components/TourPage/TourPage";
import NotFound from "./components/authentication/NotFound";

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
        <Route index element={<Overview />} />
        <Route
          path="login"
          element={
            <LoginPage setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
          }
        />
        <Route
          path="register"
          element={
            <SignupPage setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
          }
        />

        <Route path="tour">
          <Route path=":slug" element={<TourPage />} />
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
