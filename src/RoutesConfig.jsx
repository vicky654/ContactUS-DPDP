import React from "react";
import { Routes, Route } from "react-router-dom";
import ContactForm from "./components/ContactUsForm";
import ThanksPage from "./components/ThanksPage";

function RoutesConfig() {
  return (
    
    <Routes>
      <Route path="/" element={<ContactForm />} />
      <Route path="/thanks-page" element={<ThanksPage />} />
    </Routes>
  );
}

export default RoutesConfig;
