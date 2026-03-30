"use client";

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Sale } from "@/Types/types";

const getAxiosConfig = () => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

// ✅ fetch daily sales
export const useDailySales = (date: string) => {
  return useQuery<Sale[], Error>({
    queryKey: ["dailySales", date],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/sales?date=${date}`,
        getAxiosConfig()
      );

      // حماية من أي شكل data غلط
      return Array.isArray(data?.data) ? data.data : [];
    },
    enabled: !!date,
  });
};

// ✅ create sale
export const useCreateSale = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (sale: Omit<Sale, "_id">) => {
      const { data } = await axios.post(
        "/api/sales",
        sale,
        getAxiosConfig()
      );
      return data;
    },

    onSuccess: () => {
      const today = new Date().toISOString().split("T")[0];

      // ✅ الطريقة الصح في React Query v5
      queryClient.invalidateQueries({
        queryKey: ["dailySales", today],
      });
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending, // ✅ v5
    isError: mutation.isError,
    error: mutation.error,
  };
};