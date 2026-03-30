// shared/attendanceApi.ts
import api from "../../shared/api";
import { Attendance } from "@/Types/types";

export const getAttendance = async () => {
  const { data } = await api.get("/api/attendance");
  return data.data;
};

export const createAttendance = async (att: Omit<Attendance, "_id">) => {
  const { data } = await api.post("/api/attendance", att);
  return data;
};

export const updateAttendance = async ({
  id,
  att,
}: {
  id: string;
  att: Partial<Attendance>;
}) => {
  const { data } = await api.put(`/api/attendance/${id}`, att);
  return data;
};

export const deleteAttendance = async (id: string) => {
  await api.delete(`/api/attendance/${id}`);
};