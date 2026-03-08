"use client"

import { useRouter } from "next/navigation"

export default function Home() {

  const router = useRouter()

  const cards = [
    {
      title: "الموظفين",
      description: "إدارة جميع الموظفين",
      route: "/employees",
      icon: "👨‍💼",
    },
    {
      title: "إنشاء موظف",
      description: "إضافة موظف جديد",
      route: "/createEmployees",
      icon: "➕",
    },
    {
      title: "الغياب",
      description: "متابعة الغياب",
      route: "/attendance",
      icon: "🕒",
    },
    {
      title: "المبيعات",
      description: "عرض تقارير المبيعات",
      route: "/sales",
      icon: "💰",
    },
    {
      title: "إنشاء مبيعات",
      description: "إضافة بيع جديد",
      route: "/createSales",
      icon: "➕",
    },
    {
      title: "المنتجات",
      description: "إدارة المنتجات",
      route: "/products",
      icon: "📦",
    },
    {
      title: "إنشاء منتج",
      description: "إضافة منتج جديد",
      route: "/createProduct",
      icon: "➕",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-10 text-center">
        لوحة التحكم
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => router.push(card.route)}
            className="cursor-pointer bg-white rounded-xl shadow-md p-6 hover:shadow-xl hover:scale-105 transition"
          >

            <div className="text-4xl mb-3">
              {card.icon}
            </div>

            <h2 className="text-xl font-semibold">
              {card.title}
            </h2>

            <p className="text-gray-500 mt-2">
              {card.description}
            </p>

          </div>
        ))}

      </div>
    </div>
  )
}