import axios from "axios";
import { EventBus } from "../plugins/eventBus";
const BASE = "/api";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || "Server error";
    EventBus.$emit("error", message);
    return Promise.reject(error);
  }
);
export const requestsApi = {
  getAll(filters = {}) {
    const params = {};
    if (filters.name) params.name = filters.name;
    if (filters.status && filters.status !== "All")
      params.status = filters.status;
    return axios.get(`${BASE}/requests`, { params });
  },

  getByUser(userId) {
    return axios.get(`${BASE}/requests/user/${userId}`);
  },

  create(data) {
    return axios.post(`${BASE}/requests`, data);
  },

  updateStatus(id, status, comments = null) {
    return axios.patch(`${BASE}/requests/${id}`, { status, comments });
  },
};

export const usersApi = {
  getAll() {
    return axios.get(`${BASE}/users`);
  },

  create(data) {
    return axios.post(`${BASE}/users`, data);
  },
};
