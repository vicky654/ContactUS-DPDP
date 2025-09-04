import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-[#0B113C] text-white shadow-md w-full px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-shrink-0">
          <img
            className="rounded-md w-32 h-auto"
            src="/dpdp-logo1.jpg"
            alt="DPDP Logo"
          />
        </div>

        <div className="flex gap-8 items-center">
          <div className="relative group">
            <Link className="font-bold" to="/contact-us">
              Contact Us
            </Link>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 text-sm text-white bg-gray-700 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              Reach out to us
            </div>
          </div>

          <div className="relative group">
            <Link className="font-bold" to="/">
              Schedule the Call
            </Link>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 text-sm text-white bg-gray-700 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              Book your session
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
