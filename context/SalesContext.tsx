"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
import { Sale, DailySales, SalesContextType } from "@/Types/types";

const SalesContext = createContext<SalesContextType | undefined>(undefined);

export const SalesProvider = ({ children }: { children: ReactNode }) => {
  const [sales, setSales] = useState<DailySales | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // جلب التوكن من localStorage إذا كان موجود
  const getAxiosConfig = () => {
    if (typeof window === "undefined") return {};
    const token = localStorage.getItem("token");

    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  };

  // تسجيل عملية بيع جديدة
  const createSale = async (sale: Omit<Sale, "_id">) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/sales", sale, getAxiosConfig());
      setMessage("✅ تم تسجيل البيع");
      // إعادة جلب التقرير اليومي لنفس اليوم إذا موجود
      if (sales?.date === new Date().toISOString().split("T")[0]) {
        await getDailySales(sales.date);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ خطأ أثناء تسجيل البيع");
    } finally {
      setLoading(false);
    }
  };

  // جلب تقرير المبيعات اليومية حسب التاريخ
  const getDailySales = async (date: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/api/sales/daily?date=${date}`,
        getAxiosConfig()
      );
      setSales(data); // البيانات المفترض أنها DailySales
      console.log
    } catch (error) {
      console.error(error);
      setMessage("❌ خطأ أثناء جلب المبيعات");
      setSales(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SalesContext.Provider value={{ sales, loading, message, createSale, getDailySales }}>
      {children}
    </SalesContext.Provider>
  );
};

export const useSales = () => {
  const context = useContext(SalesContext);
  if (!context) throw new Error("useSales must be used within SalesProvider");
  return context;
};