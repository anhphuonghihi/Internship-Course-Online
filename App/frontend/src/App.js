import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserTerms from "./pages/UserTerms";
function App() {
  const [showNav, setShowNav] = useState(true);
  const ROLES = {
    TRAINEE: 0,
    INSTRUCTOR: 1,
    CORPORATE: 2,
    ADMIN: 3,
  };
  return (
    <div className="App">
      <BrowserRouter>
        {showNav && (
          <div className="navbar">
            <Navbar />
          </div>
        )}
        <div className="pages">
          <Routes>
            {/* public */}
            <Route index element={<Home />}></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user/terms" element={<UserTerms />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
