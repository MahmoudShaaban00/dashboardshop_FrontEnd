"use client";

import { FaChild } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

export default function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav
      dir="rtl"
      className="flex justify-between items-center bg-pink-500 text-white px-8 py-1 shadow-md"
    >

          {/* زر تسجيل الخروج */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-white text-pink-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition"
      >
        <FiLogOut />
        تسجيل الخروج
      </button>

      
      {/* اسم المتجر */}
      <div className="flex items-center gap-3">
        <FaChild className="text-3xl" />

        <div className="flex flex-col">
          <span className="text-2xl font-bold">
            الرياض
          </span>
          <span className="text-sm opacity-90">
            لملابس الأطفال
          </span>
        </div>
      </div>

  
    </nav>
  );
}