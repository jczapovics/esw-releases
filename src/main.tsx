
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Index from "./pages/Index";
import Incidents from "./pages/Incidents";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import GoalDelivery from "./pages/GoalDelivery";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Index />,
    errorElement: <NotFound />,
  },
  {
    path: "/incidents",
    element: <Incidents />,
  },
  {
    path: "/goal-delivery",
    element: <GoalDelivery />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
