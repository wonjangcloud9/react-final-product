import { createBrowserRouter } from "react-router-dom";
import { Home } from "./screens/home/Home";
import { Detail } from "./screens/detail/Detail";
import { Error404 } from "./screens/error/Error404";
import App from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error404 />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/:id",
            element: <Detail />,
          },
        ],
      },
    ],
  },
]);
