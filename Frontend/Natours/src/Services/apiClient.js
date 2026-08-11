import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api/v1";

const apiClient = axios.create({
  baseURL,
  withCredentials: true,
});

export default apiClient;
export { apiClient };
