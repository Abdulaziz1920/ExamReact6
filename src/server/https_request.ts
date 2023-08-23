import axios from "axios";
import Cookies from 'js-cookie'
import TOKEN from "../constants";

const request = axios.create({
  baseURL: "https://ap-portfolio-backend.up.railway.app/api/v1",
  timeout: 10000,
  headers: {
    Authorization: Cookies.get(TOKEN) ? "Bearer " + Cookies.get(TOKEN) : null,
  },
});

export default request;
