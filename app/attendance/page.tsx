"use client";

import { useState } from "react";
import { useAttendance } from "@/hooks/useAttendance";

export default function AttendancePage() {
  const {
    attendanceList,
    loading,
    updateAttendance,
    deleteAttendance,
  } = useAttendance();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [deduction, setDeduction] = useState(0);

  const startEdit = (att: any) => {
    setEditingId(att._id);
    setDate(att.date.split("T")[0]);
    setDeduction(att.deduction || 0);
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    await updateAttendance({
      id: editingId,
      att: { date, deduction },
    });

    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      <h1 className="text-3xl text-center mb-6">📊 الحضور</h1>

      <table className="w-full bg-white/10 rounded-xl overflow-hidden">
        <thead className="bg-white/20">
          <tr>
            <th>الموظف</th>
            <th>التاريخ</th>
            <th>الراتب</th>
            <th>الخصم</th>
            <th>بعد الخصم</th>
            <th>إجراءات</th>
          </tr>
        </thead>

        <tbody>
          {attendanceList.map((att: any) => {
            const salary = att.employee?.salary || 0;
            const finalSalary = salary - (att.deduction || 0);

            return (
              <tr key={att._id} className="text-center border-b border-white/10">

                <td>{att.employee?.name}</td>

                <td>
                  {editingId === att._id ? (
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input"/>
                  ) : (
                    att.date.split("T")[0]
                  )}
                </td>

                <td>${salary}</td>

                <td>
                  {editingId === att._id ? (
                    <input type="number" value={deduction} onChange={(e) => setDeduction(+e.target.value)} className="input w-20"/>
                  ) : (
                    att.deduction
                  )}
                </td>

                <td className="text-green-400 font-bold">${finalSalary}</td>

                <td className="flex gap-2 justify-center p-2">
                  {editingId === att._id ? (
                    <>
                      <button onClick={handleUpdate} className="btn bg-green-500">حفظ</button>
                      <button onClick={() => setEditingId(null)} className="btn bg-gray-500">إلغاء</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(att)} className="btn bg-blue-500">تعديل</button>
                      <button onClick={() => deleteAttendance(att._id)} className="btn bg-red-500">حذف</button>
                    </>
                  )}
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>

      {loading && <p className="text-center mt-4">⏳ Loading...</p>}
    </div>
  );
}