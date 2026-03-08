"use client";

import { useAttendance } from "@/context/AttendanceContext";
import { useState } from "react";
import { Attendance } from "@/Types/types";

export default function AttendancePage() {
  const { attendanceList, loading, message, updateAttendance, deleteAttendance, createAttendance } = useAttendance();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState<"present" | "absent">("present");
  const [deduction, setDeduction] = useState(0);

  // عند الضغط على تعديل، نملأ الحقول بالقيم الحالية
  const startEdit = (att: Attendance) => {
    setEditingId(att._id ?? null);
    setDate(att.date ?? "");
    setStatus(att.status ?? "present");
    setDeduction(att.deduction ?? 0);
  };

  // تحديث الحضور
  const handleUpdate = async () => {
    if (!editingId) return;
    await updateAttendance(editingId, { date, status, deduction });
    setEditingId(null);
    setDate("");
    setStatus("present");
    setDeduction(0);
  };

  // إنشاء حضور جديد
  const handleCreate = async (employeeId: string) => {
    await createAttendance({
      employee: employeeId,
      date: new Date().toISOString().split("T")[0],
      status: "present",
      deduction: 0,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">الحضور</h1>

      {message && <p className="text-center mb-4 text-sm font-medium text-gray-700">{message}</p>}

      {/* جدول مستجيب */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] bg-white rounded-xl shadow-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-3 text-left">الموظف</th>
              <th className="px-4 py-3 text-left">التاريخ</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">الراتب</th>
              <th className="px-4 py-3 text-left">خصم الغياب</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">الراتب بعد الخصم</th>
              <th className="px-4 py-3 text-center">الإجراءات</th>
            </tr>
          </thead>

          <tbody>
            {attendanceList.map((att, idx) => {
              // حساب الراتب بعد الخصم
              const salary = typeof att.employee === "object" ? att.employee.salary : 0;
              const salaryAfterDeduction = salary - (att.deduction || 0);

              return (
                <tr key={att._id ?? idx} className="border-b hover:bg-gray-50">
                  {/* اسم الموظف */}
                  <td className="px-4 py-3">
                    {typeof att.employee === "object" ? att.employee.name : att.employee}
                  </td>

                  {/* التاريخ */}
                  <td className="px-4 py-3">
                    {editingId === att._id ? (
                      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border p-1 rounded w-full" />
                    ) : (
                      att.date?.split("T")[0] ?? ""
                    )}
                  </td>

                  {/* الراتب الأصلي */}
                  <td className="px-4 py-3 hidden md:table-cell">
                    ${salary}
                  </td>

                  {/* الخصم */}
                  <td className="px-4 py-3">
                    {editingId === att._id ? (
                      <input type="number" value={deduction} onChange={(e) => setDeduction(Number(e.target.value))} className="border p-1 rounded w-20" />
                    ) : (
                      att.deduction ?? 0
                    )}
                  </td>

                  {/* الراتب بعد الخصم */}
                  <td className="px-4 py-3 hidden md:table-cell text-green-700 font-bold">
                    ${salaryAfterDeduction}
                  </td>

                  {/* الإجراءات مع أزرار responsive */}
                  <td className="px-4 py-3 text-center">
                    <div className="flex flex-wrap justify-center gap-2">
                      {editingId === att._id ? (
                        <>
                          <button onClick={handleUpdate} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">حفظ</button>
                          <button onClick={() => setEditingId(null)} className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition">إلغاء</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => startEdit(att)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">تعديل</button>
                          <button onClick={() => att._id && deleteAttendance(att._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">حذف</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {loading && <p className="text-center mt-4 text-gray-500">جاري التحميل...</p>}
    </div>
  );
}