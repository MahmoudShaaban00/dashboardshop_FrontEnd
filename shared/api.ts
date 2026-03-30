// shared/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // عدل حسب مشروعك
});

export default api;