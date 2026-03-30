// hooks/useAttendance.ts
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/attendanceApi/attendanceApi"

export const useAttendance = () => {
  const queryClient = useQueryClient();

  const { data = [], isLoading } = useQuery({
    queryKey: ["attendance"],
    queryFn: api.getAttendance,
  });

  const createMutation = useMutation({
    mutationFn: api.createAttendance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendance"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: api.updateAttendance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendance"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteAttendance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendance"] });
    },
  });

  return {
    attendanceList: data,
    loading: isLoading,
    createAttendance: createMutation.mutateAsync,
    updateAttendance: updateMutation.mutateAsync,
    deleteAttendance: deleteMutation.mutateAsync,
  };
};