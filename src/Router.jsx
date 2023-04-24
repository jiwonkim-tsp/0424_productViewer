import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Fit from "./pages/Fit";
import Maker from "./pages/Maker";
import Transfer from "./pages/Transfer";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "catalog",
        element: <Catalog />,
      },
      {
        path: "fit",
        element: <Fit />,
      },
      {
        path: "maker",
        element: <Maker />,
      },
      {
        path: "transfer",
        element: <Transfer />,
      },
    ],
  },
]);

export default Router;
