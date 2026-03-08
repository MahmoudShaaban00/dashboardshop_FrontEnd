"use client";

import { useState, useEffect } from "react";
import { useSales } from "@/context/SalesContext";

export default function DailySalesPage() {
  const { getDailySales, loading, message, sales } = useSales();
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);

  useEffect(() => {
    getDailySales(date);
  }, [date]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-blue-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-3xl shadow-xl text-center">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">📊 المبيعات اليومية</h1>

        {/* اختيار التاريخ */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mb-6 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {message && <p className="text-red-500 mb-4">{message}</p>}

        {loading ? (
          <p className="text-gray-500">جاري التحميل...</p>
        ) : (
          <div className="bg-purple-100 rounded-2xl p-6 shadow-inner">
            <p className="text-xl font-semibold mb-2">التاريخ: {sales?.date || date}</p>
            <p className="text-lg mb-2">إجمالي عدد المبيعات: {sales?.totalSales || 0}</p>
            <p className="text-lg font-bold text-purple-800">
              إجمالي الإيرادات: {sales?.totalRevenue || 0} جنيه
            </p>
          </div>
        )}
      </div>
    </div>
  );
}