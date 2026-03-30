import axios from "axios";
import { Employee, EmployeeForm } from "@/Types/types";

const token = () => localStorage.getItem("token");

export const getEmployees = async (): Promise<Employee[]> => {
  const { data } = await axios.get("/api/employees", {
    headers: { Authorization: `Bearer ${token()}` },
  });
  return data.data; // assuming the API returns { data: [...] }
};

export const createEmployee = async (formData: EmployeeForm) => {
  return axios.post("/api/employees", formData, {
    headers: { Authorization: `Bearer ${token()}` },
  });
};

export const updateEmployee = async (id: string, updatedData: Partial<Employee>) => {
  return axios.put(`/api/employees/${id}`, updatedData, {
    headers: { Authorization: `Bearer ${token()}` },
  });
};

export const deleteEmployee = async (id: string) => {
  return axios.delete(`/api/employees/${id}`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
};