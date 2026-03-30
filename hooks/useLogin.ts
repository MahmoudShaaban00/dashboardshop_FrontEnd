// hooks/useLogin.ts
"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../shared/api";
import { setToken } from "../shared/storage";
import { LoginValues } from "../Types/types";

export const useLogin = () => {
  const router = useRouter();

  const formik = useFormik<LoginValues>({
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

    onSubmit: async (values) => {
      try {
        const { data } = await api.post("/api/signin", values);

        setToken(data.access_token);

        router.push("/home");

        setTimeout(() => {
          window.location.reload();
        }, 1000);

      } catch (error: any) {
        console.log(error.response?.data || error.message);
      }
    },
  });

  return { formik };
};