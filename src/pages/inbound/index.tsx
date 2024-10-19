import { useEffect, useState } from "react";
import { API } from "../../libs"
import nodata from "../../../public/nodata.png"
import { receiving } from "../../dataTypes";

export default function Receiving() {
const [receiving, setReceiving] = useState<receiving[]>([]);

const getReceiving = async() => {
  try {
    const res = await API.get('/receive')
    console.log(res)
    setReceiving(res.data.data)
    console.log(res.data.data)
  } catch (error) {
    console.log(error)
  }}
  useEffect(() => {
    getReceiving() 
  }, [])
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      {/* Header Section */}
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard Inboud</h1>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      </div>

      {/* Table Section */}
      <div className="bg-orange-500 text-white rounded-t-lg p-4">
        <h3 className="text-lg font-semibold">
          Total Inbound Bag: {receiving.length}
        </h3>
      </div>
      <div className="bg-white rounded-b-lg shadowCard overflow-auto">
        <table className="w-full text-left table-auto border-collapse">
          <thead className="text-white">
            <tr className="border-t-2 border-white bg-orange-500">
              <th className="px-4 py-2 border border-gray-200">No</th>
              <th className="px-4 py-2 border border-gray-200">Bag ID</th>
              <th className="px-4 py-2 border border-gray-200">Bag Weight</th>
              <th className="px-4 py-2 border border-gray-200">Total Package</th>
              <th className="px-4 py-2 border border-gray-200">
              Receiver
              </th>
              <th className="px-4 py-2 border border-gray-200">
                Location
              </th>
              <th className="px-4 py-2 border border-gray-200">Status</th>
              <th className="px-4 py-2 border border-gray-200">Scanned at</th>
            </tr>
          </thead>
          <tbody>
            {/* Looping data dummy */}
            {receiving.map((data, index) => (
              <tr
                key={data.id}
                className={`text-center ${
                  index % 2 === 0 ? "bg-gray-300" : "bg-white"
                }`}
              >
                <td className="px-4 py-2 border-r  border-gray-500">
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
                <td className="px-4 py-2 border-l  border-gray-500">
                  {data.scanned_at}
                </td>
              </tr>
            ))}
            {/* Tampilkan jika tidak ada data */}
            {receiving.length === 0 && (
              <tr>
                <td colSpan={9} className="py-8">
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src={nodata}
                      alt="No Data"
                      className="w-40 mb-4"
                    />
                    <span className="text-gray-500">Tidak ada data</span>
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
