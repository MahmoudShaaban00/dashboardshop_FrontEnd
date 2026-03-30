"use client";
import Image from "next/image";
import backimg from "../../img/backgroundlogin.jpg";
import { useLogin } from "../../hooks/useLogin";

export default function Login() {
  const { formik } = useLogin();

  return (
    <div className="relative min-h-screen flex items-center justify-center">

      {/* Background Image */}
      <Image
        src={backimg}
        alt="background"
        fill
        className="object-cover -z-10"
        priority
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-blue-900/60 -z-10"></div>

      {/* Card */}
      <div className="bg-white/10 backdrop-blur-xl p-10 mx-2 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] w-[400px] border border-white/20 animate-fadeIn">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          مرحباً بعودتك 👋
        </h2>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">

          {/* Email */}
          <div>
            <label className="text-white mb-1 block">البريد الإلكتروني</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="أدخل بريدك الإلكتروني"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-white mb-1 block">كلمة المرور</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="أدخل كلمة المرور"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          {/* Button */}
          <button type="submit" className="btn">
            تسجيل الدخول
          </button>

        </form>
      </div>
    </div>
  );
}