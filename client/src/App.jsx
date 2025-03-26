import { Route, Routes } from "react-router-dom";
import Admin from "./pages/admin";
import Login from "./pages/login/Login";
import "./App.css";
import Register from "./pages/register/Register";
import Barber from "./pages/barber";
import NotFoundPage from "./pages/notFound";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/register" element={<Register />} />
        <Route path="/barber" element={<Barber />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
