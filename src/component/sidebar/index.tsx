import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBox, FaDropbox, FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { IoScanCircle } from "react-icons/io5";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navigate = useNavigate();

  const useHome = () => {
  navigate('/')
  };
  const useInbound = () => {
  navigate('/receiving')
  };

  const useOutbound = () => {
  navigate('/loading')
  };

  const useScan = () => {
  navigate('/scan')
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className={`h-full flex flex-col pr-4 pt-4 text-white bg-gray-500 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div
        className="mb-4 p-2 flex justify-center items-center bg-orenPos rounded-r-full outline-none focus:outline-none hover:outline-none active:outline-none cursor-pointer"
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
              isActive("/") ? "bg-orenPos" : "hover:bg-orenPos hover:text-gray-200"
            } rounded-r-full  cursor-pointer`}
            onClick={useHome}
          >
              <span className="mr-3">
                <AiFillHome className="text-orange-500 text-2xl" />
              </span>{" "}
              {!isCollapsed && "Home"}
          </li>
          <li
            className={`flex items-center p-3 mb-2 ${
              isActive("/receiving") ? "bg-orenPos" : "hover:bg-orenPos hover:text-gray-200"
            } rounded-r-full  cursor-pointer`}
            onClick={useInbound}
          >
              <span className="mr-3">
                <FaDropbox className="text-orange-500 text-2xl" />
              </span>{" "}
              {!isCollapsed && "Dashboard Inbound"}
          </li>
          <li
            className={`flex items-center p-3 mb-2 ${
              isActive("/loading") ? "bg-orenPos" : "hover:bg-orenPos hover:text-gray-200"
            } rounded-r-full  cursor-pointer`}
            onClick={useOutbound}
          >
              <span className="mr-3">
              <FaBox className="text-orange-500 text-2xl" />
              </span>{" "}
              {!isCollapsed && "Dashboard Outbound"}
          </li>
          <li
            className={`flex items-center p-3 mb-2 ${
              isActive("/scan") ? "bg-orenPos" : "hover:bg-orenPos hover:text-gray-200"
            } rounded-r-full  cursor-pointer`}
            onClick={useScan}
          >
              <span className="mr-3">
                <IoScanCircle className="text-orange-500 text-2xl" />
              </span>{" "}
              {!isCollapsed && "Scan"}
          </li>
        </ul>
      </nav>
    </div>
  );
}
