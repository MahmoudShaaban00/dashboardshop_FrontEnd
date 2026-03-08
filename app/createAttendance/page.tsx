"use client";

import { useEffect, useState } from "react";
import { useAttendance } from "@/context/AttendanceContext";
import { useRouter } from "next/navigation";

export default function CreateAttendancePage() {
  const router = useRouter();
  const { createAttendance, loading, message } = useAttendance();

  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState<"present" | "absent">("present");
  const [deduction, setDeduction] = useState<number>(0);

  // جلب employeeId من localStorage عند تحميل الصفحة
  useEffect(() => {
    const id = localStorage.getItem("attendance_employee_id");
    if (id) {
      setEmployeeId(id);
    } else {
      alert("Employee ID not found in localStorage");
    }
  }, []);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!employeeId || !date) {
    alert("الرجاء التأكد من إدخال التاريخ ومعرف الموظف");
    return;
  }

  // التأكد من القيم قبل الإرسال
  console.log({
    employee: employeeId,
    date,
    status,
    deduction: Number(deduction), // تحويل للقيمة الرقمية
  });

  await createAttendance({
    employee: employeeId,
    date,
    status: status as "present" | "absent",
    deduction: Number(deduction),
  });

  setDate("");
  setStatus("present");
  setDeduction(0);

  router.push("/attendance");
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-200"
      >
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-4">
          إضافة حضور
        </h1>

        {message && (
          <p className="text-center text-sm text-gray-600 font-medium mb-3">
            {message}
          </p>
        )}

        {/* Date */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            التاريخ
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            required
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            الحالة
          </label>
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as "present" | "absent")
            }
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          >
            <option value="present">حاضر ✅</option>
            <option value="absent">غائب ❌</option>
          </select>
        </div>

        {/* Deduction */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            الخصم
          </label>
          <input
            type="number"
            placeholder="0"
            value={deduction}
            onChange={(e) => setDeduction(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg hover:scale-105 transform transition duration-300 disabled:opacity-60"
        >
          {loading ? "جاري الحفظ..." : "حفظ الحضور"}
        </button>
      </form>
    </div>
  );
}