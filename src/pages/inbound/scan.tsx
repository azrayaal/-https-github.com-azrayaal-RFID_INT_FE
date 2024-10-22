import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import nodata from "../../../public/nodata.png";
import { receiving } from "../../dataTypes";
import { useNavigate } from "react-router-dom";

// const socket = io('http://localhost:3000'); // Sesuaikan URL ini dengan alamat server Anda

export default function ScanInbound() {
  const [receiving, setReceiving] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleScan = () => {
    navigate('/scan/inbound');
  };

  // Menangani data yang diterima dari WebSocket
  // useEffect(() => {
  //   socket.on('reader-data', (data) => {
  //     console.log('Received data from WebSocket:', data);

  //     // Menambahkan data yang diterima ke dalam state receiving
  //     setReceiving((prev) => [
  //       ...prev,
  //       {
  //         id: data.id,
  //         BagID: data.epc,
  //         bag_weight: data.weight || 'N/A',
  //         total: data.total || 1,
  //         receiver_name: data.receiver_name || 'Unknown',
  //         destination: data.destination || 'Unknown',
  //         status: 'Received',
  //         scanned_at: new Date().toLocaleString(),
  //       },
  //     ]);
  //   });

  //   // Membersihkan koneksi ketika komponen unmount
  //   return () => {
  //     socket.off('reader-data');
  //   };
  // }, []);

  // Filter data berdasarkan pencarian
  const filteredReceiving = receiving.filter((data) =>
    data.BagID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8 bg-gray-300">
      {/* Header Section */}
      <h1 className="text-3xl font-bold text-center">Scan Inbound</h1>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"></div>

      {/* Table Section */}
      <div className="bg-orange-500 text-white rounded-t-lg p-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          Total scanned Bag: {filteredReceiving.length}
        </h3>

        {/* Search Input */}
        <div className="flex-grow mx-4 rounded-2xl">
          <input
            type="text"
            placeholder="Search by Bag ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-md shadow focus:outline-none focus:ring-2 focus:ring-orange-500 text-black bg-gray-300"
          />
        </div>

        <div
          className="py-2 px-5 bg-orenPos rounded cursor-pointer"
          onClick={handleScan}
        >
          <h3 className="text-lg font-semibold">Start</h3>
        </div>
      </div>

      <div className="bg-white rounded-b-lg shadowCard overflow-auto">
        <table className="w-full text-left table-auto border-collapse">
          <thead className="text-white">
            <tr className="border-t-2 border-white bg-orange-500">
              <th className="px-4 py-2 border border-gray-200">No</th>
              <th className="px-4 py-2 border border-gray-200">Bag ID</th>
              <th className="px-4 py-2 border border-gray-200">Bag Weight</th>
              <th className="px-4 py-2 border border-gray-200">Total Package</th>
              <th className="px-4 py-2 border border-gray-200">Receiver</th>
              <th className="px-4 py-2 border border-gray-200">Location</th>
              <th className="px-4 py-2 border border-gray-200">Status</th>
              <th className="px-4 py-2 border border-gray-200">Scanned at</th>
            </tr>
          </thead>
          <tbody>
            {filteredReceiving.map((data, index) => (
              <tr
                key={data.id}
                className={`text-center ${
                  index % 2 === 0 ? "bg-gray-300" : "bg-white"
                }`}
              >
                <td className="px-4 py-2 border-r border-gray-500">
                  {index + 1}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {data.BagID}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {data.bag_weight} kg
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {data.total}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {data.receiver_name}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {data.destination}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {data.status}
                </td>
                <td className="px-4 py-2 border-l border-gray-500">
                  {data.scanned_at}
                </td>
              </tr>
            ))}
            {filteredReceiving.length === 0 && (
              <tr>
                <td colSpan={8} className="py-8">
                  <div className="flex flex-col items-center justify-center">
                    <img src={nodata} alt="No Data" className="w-40 mb-4" />
                    <span className="text-gray-500">No data found</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
