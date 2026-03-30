"use client";

import { useState, useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useCreateSale } from "@/hooks/useSales";

export default function CreateSalesPage() {
  const { data: productList = [], refetch: getProducts } = useProducts();
  const { mutate, isLoading } = useCreateSale();

  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getProducts();
    const stored = localStorage.getItem("saleProductId");
    if (stored) setProductId(stored);
  }, [getProducts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) return setMessage("اختر المنتج");

    mutate(
      { productId, quantity },
      {
        onSuccess: () => {
          setMessage("✅ تم تسجيل البيع بنجاح");
          setProductId("");
          setQuantity(1);
          localStorage.removeItem("saleProductId");
        },
        onError: () => setMessage("❌ حدث خطأ أثناء تسجيل البيع"),
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 space-y-6 border border-gray-200"
      >
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-4">
          تسجيل بيع جديد 🛒
        </h1>

        {message && (
          <p
            className={`text-center text-sm font-medium ${
              message.startsWith("✅") ? "text-green-700" : "text-red-700"
            }`}
          >
            {message}
          </p>
        )}

        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300"
        >
          <option value="">-- اختر المنتج --</option>
          {productList.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name} - {p.stock} متوفر
            </option>
          ))}
        </select>

        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full p-3 rounded-xl border border-gray-300"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "جاري التسجيل..." : "تسجيل البيع"}
        </button>
      </form>
    </div>
  );
}