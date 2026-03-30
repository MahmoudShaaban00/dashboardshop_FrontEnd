// api/sales.ts
import axios from "axios";
import { Sale, DailySales } from "@/Types/types";

const token = () => (typeof window !== "undefined" ? localStorage.getItem("token") : null);

const getAxiosConfig = () => ({
  headers: { Authorization: token() ? `Bearer ${token()}` : "" },
});

// تسجيل عملية بيع جديدة
export const createSale = async (sale: Omit<Sale, "_id">) => {
  const { data } = await axios.post("/api/sales", sale, getAxiosConfig());
  return data;
};

// جلب تقرير المبيعات اليومية
export const getDailySales = async (date: string): Promise<DailySales> => {
  const { data } = await axios.get(`/api/sales/daily?date=${date}`, getAxiosConfig());
  return data;
};