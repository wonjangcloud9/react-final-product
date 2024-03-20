import { createBrowserRouter } from "react-router-dom";
import { Home } from "./screens/home/Home";
import { Detail } from "./screens/detail/Detail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:id",
    element: <Detail />,
  },
]);
