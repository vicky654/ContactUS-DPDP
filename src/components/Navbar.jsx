import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-[#0B113C] text-white shadow-md w-full px-6 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-shrink-0">
          <img
            className="rounded-md w-32 h-auto"
            src="/dpdp-logo1.jpg"
            alt="DPDP Logo"
          />
        </div>

        <div className="flex gap-8 items-center">
          <NavLink
            to="/"
            className={({isActive}) =>
              isActive ? "font-bold border-b-2 border-white" : ""
            }
          >
            Schedule the Call
          </NavLink>
          <NavLink
            to="/contact-us"
            className={({isActive}) =>
              isActive ? "font-bold border-b-2 border-white" : ""
            }
          >
            Contact Us
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
