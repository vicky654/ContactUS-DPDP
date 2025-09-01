import React from "react";
import { Link } from "react-router-dom";

function ThanksPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className=" bg-white border-2 border-[#0B113C] rounded-lg shadow-md p-8 max-w-5xl text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-20 h-20 rounded-full border-4 border-[#0B113C] flex items-center justify-center">
            <svg
              className="w-10 h-10 text-[#0B113C]"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-black mb-2">Thank You !</h1>

        <p className="text-gray-600 mb-6">
          Thank you for your interest! Check your email for a link to the guide.
        </p>

        <Link
          to="/"
          className="bg-[#0B113C] text-white px-6 py-2 rounded-full shadow hover:bg-[#0b113ca8] transition flex items-center justify-center gap-2 mx-auto w-fit"
        >
          <span>←</span> Home
        </Link>
      </div>
    </div>
  );
}

export default ThanksPage;
