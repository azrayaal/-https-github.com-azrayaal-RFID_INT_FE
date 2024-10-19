import { useState } from "react";
import logo from "../../assets/logo.png";
import avatar from "../../assets/navbar/avatar.png";
import { IoIosArrowDown } from "react-icons/io";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    // Logika untuk logout, misalnya menghapus token autentikasi, redirect, dll.
    console.log("Logged out");
  };

  return (
    <div className="h-[80px] bg-orenPos w-full">
      <div className="h-full flex justify-center items-center">
        <div className="w-full max-w-screen-xl">
          <div className="grid grid-cols-3 items-center">
            {/* Kolom 1: Logo */}
            <div className="flex items-center">
              <img src={logo} alt="logo" className="h-[50px]" />
            </div>

            {/* Kolom 2: Search (Tetap di tengah) */}
            <div className="flex items-center justify-center w-full py-4">
              <div className="flex items-center bg-white rounded-md shadow-md w-full max-w-lg px-4">
                {/* Search Input dan Icon bisa diaktifkan jika dibutuhkan */}
                {/* <div className="text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35m1.65-4.15a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent flex-1 px-4 py-2 outline-none text-gray-700"
                />

                <div className="text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-5.414 5.414A1 1 0 0014 12v7l-4-4V7.414a1 1 0 00-.293-.707L4.293 6.707A1 1 0 014 6V4z"
                    />
                  </svg>
                </div> */}
              </div>
            </div>

            {/* Kolom 3: Profile (Di sebelah kanan) */}
            <div className="flex items-center justify-end p-4 rounded-md w-full max-w-lg">
              {/* Profile Image */}
              <div className="flex items-center">
                {/* <img
                  src={avatar}
                  alt="profile"
                  className="w-[48px] h-[48px] rounded-full mr-4"
                /> */}

                {/* Text Content */}
                <div className="flex-1 pr-5">
                  <div className="text-white font-semibold">Dm_Jakpus</div>
                  <div className=" font-normal text-sm text-orange-500">
                    dmjakpus@gmail.com
                  </div>
                </div>
                <div className="relative">
                  <IoIosArrowDown
                    className="text-white text-2xl font-bold cursor-pointer"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  />
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-left text-sm text-black bg-gray-200 hover:bg-gray-400"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
