
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Incidents from "./pages/Incidents";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/incidents" element={<Incidents />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
