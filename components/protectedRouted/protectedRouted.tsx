// components/protectedRoute.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // جلب التوكن من localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      // إذا لا يوجد توكن، إعادة التوجيه لصفحة login
      router.push("/login");
    } else {
      setLoading(false); // إذا يوجد توكن، إظهار المحتوى
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        جاري التحقق من الصلاحية...
      </div>
    );
  }

  // إظهار المكون فقط إذا هناك توكن
  return <>{children}</>;
}