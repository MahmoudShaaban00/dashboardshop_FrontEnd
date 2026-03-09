"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import { Attendance, AttendanceContextType } from "@/Types/types";

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export const AttendanceProvider = ({ children }: { children: ReactNode }) => {
  const [attendanceList, setAttendanceList] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Helper function to get axios config with token
  const getAxiosConfig = () => {
    if (typeof window === "undefined") return {};
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  };

  const getAttendance = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/attendance", getAxiosConfig());

      // هنا نتحقق من وجود المصفوفة داخل data.data
      setAttendanceList(Array.isArray(data.data) ? data.data : []);
      setMessage(data.message || "");
    } catch (err) {
      console.error(err);
      setMessage("❌ حدث خطأ أثناء جلب الحضور");
    } finally {
      setLoading(false);
    }
  };

 const createAttendance = async (att: Omit<Attendance, "_id">) => {
  setLoading(true);
  try {
    const { data } = await axios.post("/api/attendance", att, getAxiosConfig());

    setAttendanceList((prev) =>
      Array.isArray(prev) ? [...prev, data] : [data]
    );

    setMessage("✅ تم إضافة الغياب بنجاح");

    await getAttendance(); // تحديث البيانات
  } catch (err) {
    console.error(err);
    setMessage("❌ حدث خطأ أثناء إنشاء الغياب");
  } finally {
    setLoading(false);
  }
};

  const updateAttendance = async (
    id: string,
    att: Partial<Omit<Attendance, "_id">>
  ) => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `/api/attendance/${id}`,
        att,
        getAxiosConfig()
      );

      setAttendanceList((prev) =>
        prev.map((a) => (a._id === id ? data : a))
      );

      setMessage("✅ تم تعديل الغياب بنجاح");
      await getAttendance(); // إعادة جلب البيانات

    } catch (err) {
      console.error(err);
      setMessage("❌ حدث خطأ أثناء تعديل الغياب");
    } finally {
      setLoading(false);
    }
  };
  const deleteAttendance = async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(`/api/attendance/${id}`, getAxiosConfig());
      setAttendanceList((prev) =>
        Array.isArray(prev) ? prev.filter((a) => a._id !== id) : []
      );
      setMessage("✅ تم حذف الغياب بنجاح");
    } catch (err) {
      console.error(err);
      setMessage("❌ حدث خطأ أثناء حذف الغياب");
    } finally {
      setLoading(false);
    }
  };

  // جلب الغياب عند تحميل الصفحة
  useEffect(() => {
    getAttendance();
  }, []);

  return (
    <AttendanceContext.Provider
      value={{
        attendanceList,
        loading,
        message,
        getAttendance,
        createAttendance,
        updateAttendance,
        deleteAttendance,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = () => {
  const context = useContext(AttendanceContext);
  if (!context)
    throw new Error("useAttendance must be used within AttendanceProvider");
  return context;
};