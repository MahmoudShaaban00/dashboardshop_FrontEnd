"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import background from "../../img/seller.jpg";
import { EmployeeForm } from "../../Types/types";
import { useEmployees } from "@/hooks/useEmployees";

export default function CreateEmployee() {
  const { addEmployee } = useEmployees(); // استخدم addEmployee بدل createEmployeeMutation

  const [formData, setFormData] = useState<EmployeeForm>({
    name: "",
    email: "",
    postion: "",
    salary: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addEmployee(formData);
      setMessage("✅ تم إنشاء الموظف بنجاح");
      setFormData({ name: "", email: "", postion: "", salary: "" });
    } catch (error) {
      console.error(error);
      setMessage("❌ حدث خطأ أثناء إنشاء الموظف");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Image src={background} alt="background" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-10 w-[420px] m-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          إنشاء موظف جديد
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="text" name="name" placeholder="اسم الموظف" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <input type="email" name="email" placeholder="البريد الإلكتروني للموظف" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <input type="text" name="postion" placeholder="الوظيفة" value={formData.postion} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <input type="number" name="salary" placeholder="الراتب" value={formData.salary} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500" />

          <button type="submit" className="w-full py-3 font-semibold text-white rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            إنشاء الموظف
          </button>
        </form>

        {message && <p className="text-center mt-4 text-sm font-medium text-gray-700">{message}</p>}
      </div>
    </div>
  );
}