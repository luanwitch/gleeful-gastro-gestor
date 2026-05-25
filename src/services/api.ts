import axios from "axios";

// Base axios instance pointing to the Django REST API
export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: { "Content-Type": "application/json" },
});
