"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "@/Types/types";

// ---- Axios config with token ----
const getAxiosConfig = () => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token");
  return { headers: { Authorization: token ? `Bearer ${token}` : "" } };
};

// ----- fetch all products -----
export const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get("/api/products", getAxiosConfig());
      return Array.isArray(data.data) ? data.data : [];
    },
    staleTime: 1000 * 60,
  });
};

// ----- create product -----
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (prod: Omit<Product, "_id">) => {
      const { data } = await axios.post("/api/products", prod, getAxiosConfig());
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
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

// ----- update product -----
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      id,
      prod,
    }: {
      id: string;
      prod: Partial<Omit<Product, "_id">>;
    }) => {
      const { data } = await axios.put(
        `/api/products/${id}`,
        prod,
        getAxiosConfig()
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};

// ----- delete product -----
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/products/${id}`, getAxiosConfig());
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};