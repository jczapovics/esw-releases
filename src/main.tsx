
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import Index from "./pages/Index";
import Releases from "./pages/Releases";
import Incidents from "./pages/Incidents";
import AskAI from "./pages/AskAI";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Index />} errorElement={<NotFound />} />
      <Route path="/releases" element={<Releases />} />
      <Route path="/incidents" element={<Incidents />} />
      <Route path="/ask-ai" element={<AskAI />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
