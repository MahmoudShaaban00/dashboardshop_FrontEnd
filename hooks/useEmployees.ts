"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Employee } from "@/Types/types";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "@/api/employees/employees";

export const useEmployees = () => {
  const queryClient = useQueryClient();

  const {
    data: employees = [],
    isLoading,
    isError,
  } = useQuery<Employee[]>({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });

  const addEmployeeMutation = useMutation({
    mutationFn: createEmployee,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      }),
  });

  const updateEmployeeMutation = useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: string;
      updatedData: Partial<Employee>;
    }) => updateEmployee(id, updatedData),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      }),
  });

  const removeEmployeeMutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      }),
  });

  return {
    employees,
    isLoading,
    isError,
    addEmployee: addEmployeeMutation.mutateAsync,
    editEmployee: updateEmployeeMutation.mutateAsync,
    removeEmployee: removeEmployeeMutation.mutateAsync,
  };
};