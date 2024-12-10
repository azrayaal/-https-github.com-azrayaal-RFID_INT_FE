import cookie from "cookie.js";
import  { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { API } from "../libs";

export const PrivateRoute = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token: string = cookie.get("token") || "";
      if (token) {
        // Simpan token di cookie dengan masa berlaku 1 hari
        cookie.set("token", token, {
          maxAge: 86400, // 1 hari dalam detik
          path: "/", // Pastikan token dapat diakses di seluruh aplikasi
          sameSite: "Lax",
        });

        try {
          // Mengirim token ke server untuk memeriksa apakah ada di blacklist
          const response = await API.post(
            import.meta.env.VITE_PUBLIC_API + import.meta.env.VITE_API_VERSION + "/auth/checkToken",
            { token: atob(token) }
          );

          if (response.data.success) {
            setIsAuthenticated(true);
          } else {
            // Jika token ada di blacklist, hapus token dari cookie
            cookie.remove("token");
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Error checking token:", error);
          // Jika terjadi kesalahan dalam pengecekan token, hapus token dari cookie
          cookie.remove("token");
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }

      setLoading(false);
    };

    checkToken();
  }, [location]);

  if (loading) {
    // Sementara menunggu pengecekan token, bisa tampilkan loader atau spinner
    return <div>Loading...</div>;
  }

  // Jika user sudah terautentikasi, render Outlet untuk rute anak
  return isAuthenticated ? (
    <Outlet />
  ) : (
    // Jika tidak terautentikasi, arahkan user ke halaman login
    <Navigate to="/login" replace />
  );
};

