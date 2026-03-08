"use client"
import Image from "next/image"
import backimg from "../../img/backgroundlogin.jpg"
import axios from "axios"
import { useFormik } from "formik"
import * as Yup from "yup"
import { LoginValues } from "../../Types/types"
import { useRouter } from "next/navigation"

export default function Login() {

  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("بريد إلكتروني غير صالح")
        .required("هذا الحقل مطلوب"),
      password: Yup.string()
        .min(6, "الحد الأدنى 6 أحرف")
        .required("هذا الحقل مطلوب"),
    }),

    async onSubmit(values: LoginValues) {
      try {
        const { data } = await axios.post(
          "/api/signin",
          values
        )

        console.log("تم تسجيل الدخول بنجاح:", data)

        localStorage.setItem("token", data.access_token)

        // التحويل للصفحة
        router.push("/home")

      } catch (error: any) {
        console.log(error.response?.data || error.message)
      }
    }
  })

  return (
    <div className="relative min-h-screen flex items-center justify-center">

      <Image src={backimg} alt="background" fill className="object-cover -z-10" priority />

      <div className="absolute inset-0 bg-black/50 -z-10"></div>

      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-[400px] border border-white/20">

        <h2 className="text-3xl font-bold text-white text-center mb-6">
          مرحباً بعودتك 👋
        </h2>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">

          <div>
            <label className="text-white">البريد الإلكتروني</label>
            <input
              type="email"
              name="email"
              className="w-full p-3 rounded-lg bg-white/20 text-white outline-none border border-white/30"
              placeholder="أدخل بريدك الإلكتروني"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div>
            <label className="text-white">كلمة المرور</label>
            <input
              type="password"
              name="password"
              className="w-full p-3 rounded-lg bg-white/20 text-white outline-none border border-white/30"
              placeholder="أدخل كلمة المرور"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            تسجيل الدخول
          </button>

        </form>
      </div>
    </div>
  )
}