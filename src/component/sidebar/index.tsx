import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {  FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { IoSettings } from "react-icons/io5";
import { API_Header } from "../../libs";
import { BsCaretDownSquareFill } from "react-icons/bs";
import { BsCaretUpSquareFill } from "react-icons/bs";

import { BsBroadcast } from "react-icons/bs";


// Tentukan tipe data untuk item pada gate
type GateItem = {
  gateName: string;
  id: number;
};

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [, setGate] = useState<GateItem[]>([]);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navigate = useNavigate();

  const useHome = () => {
    navigate('/');
  };
  const useScan = () => {
    navigate('/scan');
  };
  const useReceiving = () => {
    navigate('/receiving');
  };
  const useLoading = () => {
    navigate('/loading');
  };
  const useSetting = () => {
    navigate('/settings');
  };

  const getGateway = async () => {
    try {
      const res = await API_Header.get('/gate');
      setGate(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGateway();
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className={`h-full flex flex-col pr-4 pt-4 text-white bg-gray-500 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-34"
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
              isActive("/") ? "bg-orange-500" : "hover:bg-orange-500 hover:text-gray-200"
            } rounded-r-full cursor-pointer`}
            onClick={useHome}
          >
            <span className="mr-3">
              <AiFillHome className="text-orenPos text-2xl" />
            </span>
            {!isCollapsed && "Home"}
          </li>

          {/* {gate.map((item) => (
            <li
              key={item.id}
              className={`flex items-center p-3 mb-2 ${
                isActive(`/gate/${item.id}`) || isActive(`/gate/scan/${item.id}`) ? "bg-orenPos" : "hover:bg-orenPos hover:text-gray-200"
              } rounded-r-full cursor-pointer`}
              onClick={() => navigate(`/gate/${item.id}`)}
            >
              <span className="mr-3">
                <BiSolidArch className="text-orange-500 text-2xl" />
              </span>
              {!isCollapsed && item.gateName}
            </li>
          ))} */}

          <li
            className={`flex items-center p-3 mb-2 ${
              isActive(`/receiving`) || isActive(`/receiving/scan`) ? "bg-orenPos" : "hover:bg-orenPos hover:text-gray-200"
            } rounded-r-full cursor-pointer`}
            onClick={useReceiving}
          >
            <span className="mr-3">
            <BsCaretDownSquareFill className="text-orange-500 text-2xl" />
            </span>
            {!isCollapsed && "Receiving"}
          </li>
          
          <li
            className={`flex items-center p-3 mb-2 ${
              isActive("/loading") || isActive("/loading/scan") ? "bg-orenPos" : "hover:bg-orenPos hover:text-gray-200"
            } rounded-r-full cursor-pointer`}
            onClick={useLoading}
          >
            <span className="mr-3">
            <BsCaretUpSquareFill className="text-orange-500 text-2xl" />
            </span>
            {!isCollapsed && "Loading"}
          </li>
          <li
            className={`flex items-center p-3 mb-2 ${
              isActive("/scan") ? "bg-orange-500" : "hover:bg-orange-500 hover:text-gray-200"
            } rounded-r-full cursor-pointer`}
            onClick={useScan}
          >
            <span className="mr-3">
              <BsBroadcast className="text-orenPos text-2xl" />
            </span>
            {!isCollapsed && "Scan"}
          </li>
          <li
            className={`flex items-center p-3 mb-2 ${
              isActive("/settings") ? "bg-orenPos" : "hover:bg-orenPos hover:text-gray-200"
            } rounded-r-full cursor-pointer`}
            onClick={useSetting}
          >
            <span className="mr-3">
              <IoSettings  className="text-red-700 text-2xl" />
            </span>
            {!isCollapsed && "Settings"}
          </li>
        
        </ul>
      </nav>
    </div>
  );
}
