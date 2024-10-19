import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBox, FaDropbox, FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { IoScanCircle } from "react-icons/io5";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className={`h-full flex flex-col p-4 text-white bg-gray-500 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div
        className="mb-4 p-2 flex justify-center items-center bg-orenPos rounded-lg outline-none focus:outline-none hover:outline-none active:outline-none cursor-pointer"
        onClick={toggleSidebar}
      >
        {isCollapsed ? (
          <FaArrowAltCircleRight className="text-white text-2xl" />
        ) : (
          <FaArrowAltCircleLeft className="text-white text-2xl" />
        )}
      </div>

      <nav className="flex-1">
        <ul>
          <li
            className={`flex items-center p-3 mb-2 ${
              isActive("/") ? "bg-orenPos" : "hover:bg-orenPos"
            } rounded-lg cursor-pointer`}
          >
            <Link to="/" className="flex items-center text-white">
              <span className="mr-3">
                <AiFillHome className="text-orange-500 text-2xl" />
              </span>{" "}
              {!isCollapsed && "Home"}
            </Link>
          </li>
          <li
            className={`flex items-center p-3 mb-2 ${
              isActive("/receiving") ? "bg-orenPos" : "hover:bg-orenPos"
            } rounded-lg cursor-pointer`}
          >
            <Link to="/receiving" className="flex items-center text-white">
              <span className="mr-3">
                <FaDropbox className="text-orange-500 text-2xl" />
              </span>{" "}
              {!isCollapsed && "Dashboard Inbound"}
            </Link>
          </li>
          <li
            className={`flex items-center p-3 mb-2 ${
              isActive("/loading") ? "bg-orenPos" : "hover:bg-orenPos"
            } rounded-lg cursor-pointer`}
          >
            <Link to="/loading" className="flex items-center text-white">
              <span className="mr-3">
              <FaBox className="text-orange-500 text-2xl" />
              </span>{" "}
              {!isCollapsed && "Dashboard Outbound"}
            </Link>
          </li>
          <li
            className={`flex items-center p-3 mb-2 ${
              isActive("/scan") ? "bg-orenPos" : "hover:bg-orenPos"
            } rounded-lg cursor-pointer`}
          >
            <Link to="/scan" className="flex items-center text-white">
              <span className="mr-3">
                <IoScanCircle className="text-orange-500 text-2xl" />
              </span>{" "}
              {!isCollapsed && "Scan"}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
