
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Index from "./pages/Index";
import Releases from "./pages/Releases";
import Incidents from "./pages/Incidents";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AskAI from "./pages/AskAI";

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
    path: "/releases",
    element: <Releases />,
  },
  {
    path: "/incidents",
    element: <Incidents />,
  },
  {
    path: "/ask-ai",
    element: <AskAI />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
