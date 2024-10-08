import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Sign from "./components/Sign";
import Home from "./components/Home"; 
import Welcome from "./Pages/Welcome";
import FindSpace from "./Pages/FindSpace";
import RentSpace from "./Pages/RentSpace";
import BasicMap from "./components/BasicMap";
import AboutUs from "./Pages/AboutUs";
import RentForm from "./components/RentForm";

function App() {
  return (

      <Router>
        <Routes>
          <Route path="/sign" element={<Sign />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/find-space" element={<FindSpace />} />
          <Route path="/rent-space" element={<RentSpace />} />
          <Route path="/map/" element={<BasicMap />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/RentForm" element={<RentForm />} />
        </Routes>
      </Router>

  );
}

export default App;