import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "./components/RootLayout";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import TourList, { toursLoader } from "./components/TourList";
import TourPage, { tourLoader } from "./components/TourPage/TourPage";
import NotFound from "./components/NotFound";

import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<TourList />} loader={toursLoader} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<SignupPage />} />

      <Route path="tour">
        <Route path=":slug" element={<TourPage />} loader={tourLoader} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
