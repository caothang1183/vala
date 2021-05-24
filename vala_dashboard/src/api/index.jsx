import axios from "axios";

const instance = axios.create({
  baseURL: "https://vala-web.herokuapp.com/api",
});

instance.interceptors.request.use((config) => {
  if (localStorage.getItem("UserAdmin")) {
    const token = localStorage.getItem("UserAdmin");
    config.headers.Authorization = token;
    config.headers.department = "development";
    config.headers.Owner = "nncthang";
  }
  return config;
});

export default instance;
