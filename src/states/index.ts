import Cookies from "js-cookie";
import { create } from "zustand";
import request from "../server/https_request";
import Login from "../types";
import { NavigateFunction } from "react-router-dom";
import TOKEN from "../constants";


interface AuthType {
  isAuthenticated: boolean;
  login: (data: Login, navigate: NavigateFunction) => void;
  logout: (navigate: NavigateFunction) => void;
}

const isAuth = create<AuthType>((set) => ({
  isAuthenticated: Cookies.get(TOKEN) ? true : false,
  login: async (data: Login, navigate) => {
    try {
      const res = await request.post("auth/login", data);
      Cookies.set(TOKEN, res.data.token); // Сохранение токена в Cookie
      set({ isAuthenticated: true });
      navigate("/dashboard");
    } catch (error) {
      console.log("Ошибка отправки данных на сервер");
    }
  },
  logout: (navigate) => {
    navigate("/");
    Cookies.remove(TOKEN); // Удаление токена из Cookie
    set({ isAuthenticated: false });
    location.reload();
  },
}));

export default isAuth;
