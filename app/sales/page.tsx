"use client";

import { useState } from "react";
import { useDailySales } from "@/hooks/useSales";
import { Sale } from "@/Types/types";

export default function DailySalesPage() {
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const { data: sales = [], isLoading, error } = useDailySales(date);

  const totalSales = sales.length;

  const totalRevenue = sales.reduce(
    (acc, sale) => acc + (sale.total || 0),
    0
  );

  return (
    <div>
      <p>عدد المبيعات: {totalSales}</p>
      <p>الإيرادات: {totalRevenue}</p>
    </div>
  );
}