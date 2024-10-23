import axios from "axios";
import cookie from "js-cookie";
import {jwtDecode} from "jwt-decode";

// Function to get the token from cookies
const token: string = cookie.get("token") || "";
const tokenDecode: string = atob(token);

// Decode the token if it exists
// const tokenDecoded = tokenDecode ? jwtDecode(tokenDecode) : null;
// Axios instance for API without headers
export const API = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API + `/api/v1/`,
});

// Axios instance for API with Authorization headers
export const API_Header = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API + `/api/v1/`,
  headers: {
    Authorization: tokenDecode ? `Bearer ${tokenDecode}` : "",
    // "Content-type": "multipart/form-data",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Export base URL for images or other uses
export const imgUrl = import.meta.env.VITE_IMG_BASE_URL;
export const baseUrl = import.meta.env.VITE_IMG_BASE_URL;
