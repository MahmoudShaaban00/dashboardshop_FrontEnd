"use client";

import { useState, useEffect } from "react";
import { useSales } from "@/context/SalesContext";
import { useProduct } from "@/context/ProductContext";

export default function CreateSalesPage() {
  const { createSale, loading, message } = useSales();
  const { productList, getProducts } = useProduct();

  // قراءة productId من localStorage
  const storedProductId = typeof window !== "undefined" ? localStorage.getItem("saleProductId") || "" : "";
  const [productId, setProductId] = useState(storedProductId);
  const [quantity, setQuantity] = useState(1);

  // جلب المنتجات عند تحميل الصفحة
  useEffect(() => {
    getProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) return alert("اختر المنتج");

    await createSale({ productId, quantity });

    setQuantity(1);
    localStorage.removeItem("saleProductId"); // إزالة بعد البيع
    setProductId("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 space-y-6 border border-gray-200"
      >
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-4">تسجيل بيع جديد 🛒</h1>

        {message && <p className="text-center text-sm text-gray-600 font-medium">{message}</p>}

        {/* اختيار المنتج */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700">اختر المنتج</label>
          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          >
            <option value="">-- اختر المنتج --</option>
            {productList.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} - {p.stock} متوفر
              </option>
            ))}
          </select>
        </div>

        {/* إدخال الكمية */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700">الكمية</label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />
        </div>

        {/* زر تسجيل البيع */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold shadow-lg hover:scale-105 transform transition-all duration-300"
        >
          {loading ? "جاري التسجيل..." : "تسجيل البيع"}
        </button>
      </form>
    </div>
  );
}