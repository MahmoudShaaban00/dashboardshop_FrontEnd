"use client";

import { useState } from "react";
import { useCreateProduct } from "@/hooks/useProducts";
import { useRouter } from "next/navigation";
import { Product } from "@/Types/types";

export default function CreateProductPage() {
  const router = useRouter();
  const createProduct = useCreateProduct();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [barcode, setBarcode] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    createProduct.mutate(
      { name, description, price: Number(price), stock: Number(stock), size, color, barcode },
      {
        onSuccess: () => {
          setMessage("✅ تم إضافة المنتج بنجاح");
          setName("");
          setDescription("");
          setPrice("");
          setStock("");
          setSize("");
          setColor("");
          setBarcode("");
          router.push("/products");
        },
        onError: () => setMessage("❌ حدث خطأ أثناء إنشاء المنتج"),
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl p-10 space-y-6 border"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800">إضافة منتج جديد</h1>

        {message && (
          <div
            className={`p-3 rounded-lg text-center ${
              message.startsWith("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-5">
          <input
            placeholder="اسم المنتج"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            required
          />
          <input
            placeholder="الوصف"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input"
            required
          />
          <input
            type="number"
            placeholder="السعر"
            value={price}
            onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
            className="input"
            required
          />
          <input
            type="number"
            placeholder="الكمية"
            value={stock}
            onChange={(e) => setStock(e.target.value === "" ? "" : Number(e.target.value))}
            className="input"
            required
          />
          <input
            placeholder="المقاس"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="input"
          />
          <input
            placeholder="اللون"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="input"
          />
          <input
            placeholder="الباركود"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            className="input md:col-span-2"
          />
        </div>

        <button
          type="submit"
          disabled={createProduct.isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {createProduct.isLoading ? "جاري الحفظ..." : "إضافة المنتج"}
        </button>
      </form>
    </div>
  );
}