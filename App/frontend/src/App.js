import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
function App() {
  const [showNav, setShowNav] = useState(true);
  return (
    <div className="App">
      <BrowserRouter>
        {showNav && (
          <div>
            <Navbar />
          </div>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
