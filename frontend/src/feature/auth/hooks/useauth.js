import api from "../services/auth.api";
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";

export function useAuth() {
  const context = useContext(AuthContext);
  const { user, loading } = context;

  async function register(email, password, username) {
    context.setloading(true);
    const data = await api.registerUser(email, password, username);
    context.setuser(data.user);
    context.setloading(false);
  }

  async function login(email, password) {
    context.setloading(true);
    const data = await api.loginUser(email, password);
    context.setuser(data.user);
    console.log(data)
    context.setloading(false);
  }

  async function logout() {
    context.setloading(true);
    await api.logoutUser();
    context.setuser(null);
    context.setloading(false);
  }

  async function getCurrentUser() {
    context.setloading(true);
    const data = await api.getCurrentUser();
    context.setuser(data.user);
    context.setloading(false);
  }

  useEffect(() => {
    getCurrentUser();
  },[])

  return {
    getCurrentUser,
    register,
    login,
    logout,
    user,
    loading,
  };
}
