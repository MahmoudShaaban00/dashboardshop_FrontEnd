"use client";

import { useState } from "react";
import { useEmployees } from "@/hooks/useEmployees";
import { useRouter } from "next/navigation";

type Employee = {
  _id: string;
  name: string;
  email: string;
  salary: number;
};

export default function Employees() {
  const { employees, removeEmployee, editEmployee } = useEmployees();
  const router = useRouter();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [salary, setSalary] = useState<number>(0);

  const startEdit = (emp: Employee) => {
    setEditingId(emp._id);
    setName(emp.name);
    setSalary(emp.salary);
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    await editEmployee({
      id: editingId,
      updatedData: { name, salary },
    });

    setEditingId(null);
  };

  const handleRecordAttendance = (empId: string) => {
    localStorage.setItem("attendance_employee_id", empId);
    router.push("/createAttendance");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">الموظفون</h1>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] table-auto">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 py-3 text-left">الاسم</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">
                  البريد الإلكتروني
                </th>
                <th className="px-4 py-3 text-left">الراتب</th>
                <th className="px-4 py-3 text-center">الإجراءات</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((emp: Employee) => (
                <tr key={emp._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {editingId === emp._id ? (
                      <input
                        className="border p-1 rounded w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    ) : (
                      emp.name
                    )}
                  </td>

                  <td className="px-4 py-3 hidden md:table-cell">
                    {emp.email}
                  </td>

                  <td className="px-4 py-3">
                    {editingId === emp._id ? (
                      <input
                        type="number"
                        className="border p-1 rounded w-full"
                        value={salary}
                        onChange={(e) =>
                          setSalary(Number(e.target.value))
                        }
                      />
                    ) : (
                      `$${emp.salary}`
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex flex-wrap justify-center gap-2">
                      {editingId === emp._id ? (
                        <>
                          <button
                            onClick={handleUpdate}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                          >
                            حفظ
                          </button>

                          <button
                            onClick={() => setEditingId(null)}
                            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                          >
                            إلغاء
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(emp)}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                          >
                            تعديل
                          </button>

                          <button
                            onClick={() => removeEmployee(emp._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          >
                            حذف
                          </button>

                          <button
                            onClick={() =>
                              handleRecordAttendance(emp._id)
                            }
                            className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                          >
                            تسجيل الغياب
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}