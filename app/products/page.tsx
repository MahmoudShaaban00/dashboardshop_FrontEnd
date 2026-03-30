"use client";

import { useState } from "react";
import { useProducts, useUpdateProduct, useDeleteProduct } from "@/hooks/useProducts";

export default function ProductsPage() {
  const { data: productList = [], isLoading } = useProducts();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    price: 0,
    stock: 0,
    size: "",
    color: "",
  });

  const handleEdit = (product: any) => {
    setEditId(product._id);
    setForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
      size: product.size,
      color: product.color,
    });
  };

  const handleUpdate = () => {
    if (!editId) return;
    updateProduct.mutate(
      { id: editId, prod: form },
      { onSuccess: () => setEditId(null) }
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">📦 المنتجات</h1>

      <div className="overflow-x-auto bg-white shadow-xl rounded-xl">
        <table className="w-full min-w-[700px] text-center border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border">الاسم</th>
              <th className="p-3 border">السعر</th>
              <th className="p-3 border">الكمية</th>
              <th className="p-3 border">المقاس</th>
              <th className="p-3 border">اللون</th>
              <th className="p-3 border">العمليات</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product) => (
              <tr key={product._id} className="border-t">
                {editId === product._id ? (
                  <>
                    <td className="p-2">
                      <input
                        className="border p-1 rounded w-full"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        className="border p-1 rounded w-full"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        className="border p-1 rounded w-full"
                        value={form.stock}
                        onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                      />
                    </td>
                    <td className="p-2">
                      <input
                        className="border p-1 rounded w-full"
                        value={form.size}
                        onChange={(e) => setForm({ ...form, size: e.target.value })}
                      />
                    </td>
                    <td className="p-2">
                      <input
                        className="border p-1 rounded w-full"
                        value={form.color}
                        onChange={(e) => setForm({ ...form, color: e.target.value })}
                      />
                    </td>
                    <td className="space-x-2 p-2 flex justify-center flex-wrap gap-2">
                      <button
                        onClick={handleUpdate}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                      >
                        حفظ
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
                      >
                        إلغاء
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-3">{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>{product.size}</td>
                    <td>{product.color}</td>
                    <td className="space-x-2 p-2 flex justify-center flex-wrap gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                      >
                        تعديل
                      </button>
                      <button
                        onClick={() => deleteProduct.mutate(product._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        حذف
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isLoading && <p className="text-center mt-4 text-gray-500">جاري التحميل...</p>}
    </div>
  );
}