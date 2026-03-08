"use client";

import { useProduct } from "@/context/ProductContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const router = useRouter();

  // استدعاء سياق المنتجات للحصول على المنتجات والوظائف
  const { productList, deleteProduct, updateProduct, loading } = useProduct();

  // حالة لتحديد أي منتج يتم تعديله
  const [editId, setEditId] = useState<string | null>(null);

  // حالة لتخزين بيانات النموذج عند التعديل
  const [form, setForm] = useState({
    name: "",
    price: 0,
    stock: 0,
    size: "",
    color: "",
  });

  // دالة لتعبئة بيانات النموذج عند الضغط على "تعديل"
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

  // دالة لتحديث المنتج بعد التعديل
  const handleUpdate = async () => {
    if (!editId) return; // إذا لم يتم تحديد المنتج، لا نفعل شيء
    await updateProduct(editId, form); // استدعاء دالة تحديث المنتج من الكونتكست
    setEditId(null); // إعادة تعيين editId بعد الحفظ
  };

  // دالة البيع: تخزين id المنتج في localStorage والانتقال لصفحة تسجيل البيع
  const handleSell = (productId: string) => {
    localStorage.setItem("saleProductId", productId); // تخزين المنتج للبيع
    router.push("/sales/create"); // الانتقال لصفحة تسجيل البيع
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* عنوان الصفحة */}
      <h1 className="text-3xl font-bold mb-6 text-center">📦 المنتجات</h1>

      {/* حاوية الجدول مع تمرير أفقي للشاشات الصغيرة */}
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
            {/* عرض كل المنتجات */}
            {productList.map((product, index) => (
              <tr key={product._id || index} className="border-t">

                {/* إذا كان هذا المنتج قيد التعديل */}
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
                      {/* زر حفظ التعديلات */}
                      <button
                        onClick={handleUpdate}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                      >
                        حفظ
                      </button>
                      {/* زر إلغاء التعديل */}
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
                    {/* عرض بيانات المنتج العادية */}
                    <td className="p-3">{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>{product.size}</td>
                    <td>{product.color}</td>

                    <td className="space-x-2 p-2 flex justify-center flex-wrap gap-2">
                      {/* زر تعديل */}
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                      >
                        تعديل
                      </button>
                      {/* زر حذف */}
                      <button
                        onClick={() => deleteProduct(product._id!)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        حذف
                      </button>
                      {/* زر البيع */}
                      <button
                        onClick={() => handleSell(product._id!)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                      >
                        بيع
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* عرض حالة التحميل */}
      {loading && <p className="text-center mt-4 text-gray-500">جاري التحميل...</p>}
    </div>
  );
}