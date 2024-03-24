import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Events from "./components/events/Events";
import ViewEvents from "./components/events/ViewEvents";
import CreateEvents from "./components/events/CreateEvents";
import ChangeEvents from "./components/events/ChangeEvents";
import DeleteEvents from "./components/events/DeleteEvents";
import ViewInstitutions from "./components/institution/ViewInstitutions";
import CreateInstitutions from "./components/institution/CreateInstitutions";
import ChangeInstitutions from "./components/institution/ChangeInstitutions";
import DeleteInstitutions from "./components/institution/DeleteInstitutions";
import Institutions from "./components/institution/Institutions";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const updateDarkMode = useCallback(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  useEffect(() => {
    updateDarkMode();
  }, [isDarkMode, updateDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    updateDarkMode();
  }, [isDarkMode, updateDarkMode]);

  return (
    <Router>
      <ToastContainer />
      <div className={`app-container ${isDarkMode ? "dark-mode" : ""}`}>
        <button onClick={toggleDarkMode} className="dark-mode-toggle-btn">
          {isDarkMode ? (
            <IoMdSunny size={24} className="sun-icon" />
          ) : (
            <IoMdMoon size={24} />
          )}
        </button>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/view" element={<ViewEvents />} />
          <Route path="/events/create" element={<CreateEvents />} />
          <Route path="/events/change" element={<ChangeEvents />} />
          <Route path="/events/delete" element={<DeleteEvents />} />
          <Route path="/institutions" element={<Institutions />} />
          <Route path="/institutions/view" element={<ViewInstitutions />} />
          <Route path="/institutions/create" element={<CreateInstitutions />} />
          <Route path="/institutions/change" element={<ChangeInstitutions />} />
          <Route path="/institutions/delete" element={<DeleteInstitutions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
