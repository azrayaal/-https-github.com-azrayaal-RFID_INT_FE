import axios from "axios";

export const API = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_API + import.meta.env.VITE_API_VERSION,
})

export const API_Header = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_API + import.meta.env.VITE_API_VERSION,
    headers: {
        "Content-type": "multipart/form-data",
    }
})

