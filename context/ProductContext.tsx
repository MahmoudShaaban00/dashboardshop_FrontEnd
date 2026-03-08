// context/ProductContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import axios from "axios";
import { Product, ProductContextType } from "@/Types/types";

// إنشاء السياق
const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // دالة لإعداد هيدر التوكن
  const getAxiosConfig = () => {
    if (typeof window === "undefined") return {};
    const token = localStorage.getItem("token");
    return { headers: { Authorization: token ? `Bearer ${token}` : "" } };
  };

  // جلب المنتجات
 const getProducts = useCallback(async () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) return; // ⚠️ إذا لا يوجد توكن، تجاهل الطلب

  setLoading(true);
  try {
    const { data } = await axios.get("/api/products", getAxiosConfig());
    setProductList(Array.isArray(data.data) ? data.data : []);
    setMessage(data.message || "");
  } catch (err) {
    console.error(err);
    setMessage("❌ حدث خطأ أثناء جلب المنتجات");
  } finally {
    setLoading(false);
  }
}, []);
  // إنشاء منتج جديد
  const createProduct = async (prod: Omit<Product, "_id">) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/products", prod, getAxiosConfig());
      setProductList((prev) => (Array.isArray(prev) ? [...prev, data] : [data]));
      setMessage("✅ تم إضافة المنتج بنجاح");
      await getProducts(); // إعادة جلب المنتجات بعد الإضافة
    } catch (err) {
      console.error(err);
      setMessage("❌ حدث خطأ أثناء إنشاء المنتج");
    } finally {
      setLoading(false);
    }
  };

  // تحديث منتج
  const updateProduct = async (id: string, prod: Partial<Omit<Product, "_id">>) => {
    setLoading(true);
    try {
      const { data } = await axios.put(`/api/products/${id}`, prod, getAxiosConfig());
      setProductList((prev) => prev.map((p) => (p._id === id ? data : p)));
      setMessage("✅ تم تعديل المنتج بنجاح");
      await getProducts();
    } catch (err) {
      console.error(err);
      setMessage("❌ حدث خطأ أثناء تعديل المنتج");
    } finally {
      setLoading(false);
    }
  };

  // حذف منتج
  const deleteProduct = async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(`/api/products/${id}`, getAxiosConfig());
      setProductList((prev) => prev.filter((p) => p._id !== id));
      setMessage("✅ تم حذف المنتج بنجاح");
    } catch (err) {
      console.error(err);
      setMessage("❌ حدث خطأ أثناء حذف المنتج");
    } finally {
      setLoading(false);
    }
  };

  // استخدام useEffect لجلب المنتجات عند تحميل الصفحة
  useEffect(() => {
    getProducts(); // دالة getProducts سيتم تنفيذها مرة واحدة عند mount
  }, [getProducts]); // نضع getProducts في dependencies لأنها محمية بـ useCallback

  return (
    <ProductContext.Provider value={{ productList, loading, message, getProducts, createProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

// Hook لاستخدام سياق المنتجات
export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProduct must be used within ProductProvider");
  return context;
};