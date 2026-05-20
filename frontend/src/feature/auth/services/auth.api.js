import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

async function registerUser(email, password, username) {
  const response = await api.post("/auth/register", {
    email,
    password,
    username,
  });
  return response.data;
}

async function loginUser(email, password) {
  const response = await api.post("/auth/login", {
    email,
    password,
  });
  return response.data;
}

async function logoutUser() {
  const response = await api.post("/auth/logout");
  return response.data;
}

async function getCurrentUser() {
  const response = await api.get("/auth/getme");
  return response.data;
}

export default {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
};
