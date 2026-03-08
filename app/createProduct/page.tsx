"use client";

import { useState } from "react";
import { useProduct } from "@/context/ProductContext";
import { useRouter } from "next/navigation";

export default function CreateProductPage() {
  const router = useRouter();
  const { createProduct, loading, message } = useProduct();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [barcode, setBarcode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createProduct({
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      size,
      color,
      barcode,
    });

    setName("");
    setDescription("");
    setPrice("");
    setStock("");
    setSize("");
    setColor("");
    setBarcode("");

    router.push("/products");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl p-10 space-y-6 border"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800">
          إضافة منتج جديد
        </h1>

        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg text-center">
            {message}
          </div>
        )}

        {/* Grid Inputs */}
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block mb-1 font-medium">اسم المنتج</label>
            <input
              type="text"
              placeholder="ادخل اسم المنتج"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">الوصف</label>
            <input
              type="text"
              placeholder="ادخل وصف المنتج"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">السعر</label>
            <input
              type="number"
              placeholder="ادخل السعر"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="input"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">الكمية</label>
            <input
              type="number"
              placeholder="ادخل الكمية"
              value={stock}
              onChange={(e) =>
                setStock(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="input"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">المقاس</label>
            <input
              type="text"
              placeholder="M / L / XL"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="input"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">اللون</label>
            <input
              type="text"
              placeholder="Red / Blue"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="input"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">الباركود</label>
            <input
              type="text"
              placeholder="ادخل الباركود"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              className="input"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg hover:scale-105 transition"
        >
          {loading ? "جاري الحفظ..." : "إضافة المنتج"}
        </button>
      </form>
    </div>
  );
}