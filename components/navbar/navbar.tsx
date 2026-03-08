"use client";

import { useRouter, usePathname } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  // دالة تسجيل الخروج
  const handleLogout = () => {
    localStorage.clear(); // إزالة كل البيانات
    router.push("/login"); // إعادة التوجيه لصفحة تسجيل الدخول
  };

  // لا تظهر Navbar في صفحة تسجيل الدخول
  if (pathname === "/login") return null;

  return (
    <nav className="bg-purple-600 text-white px-6 py-2 flex justify-end items-center shadow-lg">
      <button
        onClick={handleLogout}
        className="p-2 rounded-full hover:bg-red-500 transition"
        title="تسجيل الخروج"
      >
        <FiLogOut size={24} />
      </button>
    </nav>
  );
}