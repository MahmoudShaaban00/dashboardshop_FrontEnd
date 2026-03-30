"use client";

import { useEffect, useState } from "react";
import { useAttendance } from "@/hooks/useAttendance";
import { useRouter } from "next/navigation";

export default function CreateAttendancePage() {
  const router = useRouter();
  const { createAttendance, loading } = useAttendance();

  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState<"present" | "absent">("present");
  const [deduction, setDeduction] = useState(0);

  useEffect(() => {
    const id = localStorage.getItem("attendance_employee_id");
    if (id) setEmployeeId(id);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!employeeId || !date) return alert("❌ البيانات ناقصة");

    await createAttendance({
      employee: employeeId,
      date,
      status,
      deduction,
    });

    router.push("/attendance");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <form onSubmit={handleSubmit} className="glass-card w-full max-w-md">

        <h1 className="text-2xl font-bold text-center mb-6">
          ➕ إضافة حضور
        </h1>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input"
          required
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
          className="input"
        >
          <option value="present">حاضر</option>
          <option value="absent">غائب</option>
        </select>

        <input
          type="number"
          value={deduction}
          onChange={(e) => setDeduction(+e.target.value)}
          className="input"
          placeholder="الخصم"
        />

        <button className="btn w-full">
          {loading ? "جاري الحفظ..." : "حفظ"}
        </button>

      </form>
    </div>
  );
}