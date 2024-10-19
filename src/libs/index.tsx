import axios from "axios";
import cookie from "cookie.js";
import { jwtDecode } from "jwt-decode";

// Fungsi untuk mendapatkan nilai token dari localStorage
// const token: any = cookie.get("token");
// const tokenDecode = jwtDecode(token);

// Axios instances for API
export const API = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API + `/api/v1/`,
});

// export const API_Header = axios.create({
//   baseURL: import.meta.env.VITE_PUBLIC_API + `/api/v1/`,
//   headers: {
//     Authorization: `Bearer ${tokenDecode}`,
//     "Content-type": "multipart/form-data",
//   },
// });

export const imgUrl = import.meta.env.VITE_IMG_BASE_URL;
export const baseUrl = import.meta.env.VITE_IMG_BASE_URL;
