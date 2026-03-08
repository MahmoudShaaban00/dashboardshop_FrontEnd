"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Employee, EmployeesContextType } from "../Types/types";

// إنشاء سياق الموظفين
const EmployeesContext = createContext<EmployeesContextType | null>(null);

export const EmployeesProvider = ({ children }: { children: React.ReactNode }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  // ----------------------------
  // جلب الموظفين من الـ API
  // ----------------------------
  const getEmployees = async () => {
    try {
      // تحقق من وجود التوكن
      const token = localStorage.getItem("token");
      if (!token) return; // ⚠️ إذا لا يوجد توكن، تجاهل الطلب

      const { data } = await axios.get("/api/employees", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmployees(data.data);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

  // ----------------------------
  // حذف موظف
  // ----------------------------
  const deleteEmployee = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.delete(`/api/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getEmployees(); // إعادة جلب الموظفين بعد الحذف
    } catch (error) {
      console.error("Failed to delete employee:", error);
    }
  };

  // ----------------------------
  // تحديث بيانات موظف
  // ----------------------------
  const updateEmployee = async (id: string, updatedData: Partial<Employee>) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.put(`/api/employees/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getEmployees(); // إعادة جلب الموظفين بعد التحديث
    } catch (error) {
      console.error("Failed to update employee:", error);
    }
  };

  // ----------------------------
  // استدعاء getEmployees فقط إذا هناك توكن
  // ----------------------------
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("token")) {
      getEmployees();
    }
  }, []); // [] يعني تنفيذ مرة واحدة عند mount

  return (
    <EmployeesContext.Provider
      value={{
        employees,
        getEmployees,
        deleteEmployee,
        updateEmployee,
      }}
    >
      {children}
    </EmployeesContext.Provider>
  );
};

export const useEmployees = () => {
  const context = useContext(EmployeesContext);
  if (!context) throw new Error("useEmployees must be used within EmployeesProvider");
  return context;
};