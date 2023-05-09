import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { RequireAuth } from "react-auth-kit";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import LoginPage from "./components/authentication/LoginPage";
import SignupPage from "./components/authentication/SignupPage";
import Overview from "./components/Overview";
import TourPage from "./components/TourPage/TourPage";
import NotFound from "./components/authentication/NotFound";

import "./App.css";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route
          index
          element={
            <RequireAuth loginPath="/login">
              <Overview />
            </RequireAuth>
          }
        />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<SignupPage />} />

        <Route path="tour">
          <Route path=":slug" element={<TourPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <div className="App">
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
};

export default App;
