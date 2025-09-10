import React from "react";
import { Routes, Route } from "react-router-dom";
import ContactForm from "./components/ContactUsForm";
import ThanksPage from "./components/ThanksPage";
import ScheduleForm from "./components/ScheduleForm";

function RoutesConfig() {
  return (
    
    <Routes>
      <Route path="/" element={<ScheduleForm />} />
      <Route path="/contact-us" element={<ContactForm />} />
      <Route path="/thanks-page" element={<ThanksPage />} />
    </Routes>
  );
}

export default RoutesConfig;
