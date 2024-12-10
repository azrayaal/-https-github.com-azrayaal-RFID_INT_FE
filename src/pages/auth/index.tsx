import React, { useState } from "react";
import Cookies from "js-cookie";
import logoPos from "../../assets/logo2.png";
import { toast } from "react-toastify";
import { API } from "../../libs";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      console.log(response)

      if (response.status === 200 && response.data.success) {
        // Save the token in a cookie
        const token = btoa(response.data.token);
        Cookies.set("token", token, { expires: 1 }); // Expires in 1 day

        // Redirect user or perform any other action upon successful login
        toast("Login successful!");
        window.location.href = "/"; // Redirect to home page or another page
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during login. Please check your credentials.");
    }
  };

  return (
    <div className="flex h-screen bg-orenPos">
      <div className="w-full max-w-xs m-auto bg-indigo-100 rounded p-5">
        <header>
          <img className="w-20 mx-auto mb-5" src={logoPos} alt="Logo" />
        </header>
        <form onSubmit={handleLogin}>
          <div>
            <label className="block mb-2 text-orenPos font-bold">Email</label>
            <input
              className="bg-gray-300 w-full p-2 mb-6 text-orenPos border-b-2 border-orange-500 outline-none focus:bg-gray-400 focus:text-orenPos"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-orenPos font-bold">Password</label>
            <input
              className="bg-gray-300 w-full p-2 mb-6 text-orenPos border-b-2 border-orange-500 outline-none focus:bg-gray-400 focus:text-orenPos"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div>
            <input
              className="w-full bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 mb-6 rounded"
              type="submit"
              value="Login"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
