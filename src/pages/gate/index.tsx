// import { useParams } from "react-router-dom";
// import { receiving } from "../../dataTypes";
// import { useEffect, useState } from "react";
// import nodata from "../../../public/nodata.png"
// import { useNavigate } from "react-router-dom";
// import { API_Header } from "../../libs";

// export default function ReceivingGate() {
//   const { id } = useParams();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [gateName, setGateName] = useState("");
//   const [totalBag, setTotalBag] = useState(0);
//   const [dataMovement, setDataMovement] = useState<receiving[]>([]);

//   const navigate = useNavigate()

//   const handleScan = () => {
//     navigate(`/gate/scan/${id}`);
//   };
//   const getData = async (id: any) => {
//     try {
//       // Clear previous data before fetching new data
//       setGateName("");
//       setDataMovement([]);
//       setTotalBag(0);
      
//       const res = await API_Header.get(`/gate/${id}`);
//       console.log(res.data);
//       setGateName(res.data.gateDetail.gateName);
//       setDataMovement(res.data.data);
//       setTotalBag(res.data.total);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const filteredData = dataMovement.filter(
//     (data) =>
//       data.EPC.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       data.PID.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   useEffect(() => { 
//     getData(id);
//   }, [id]);

//   return (
//     <div className="min-h-screen p-8 bg-gray-300">
//       {/* Header Section */}
//       <h1 className="text-3xl font-bold text-center">{gateName}</h1>

//       {/* Status Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//       </div>

//       {/* Table Section */}
//       <div className="bg-orange-500 text-white rounded-t-lg p-4 flex justify-between items-center">
//   <h3 className="text-lg font-semibold">
//     Total Bag: {totalBag}
//   </h3>

//   {/* Search Input */}
//   <div className="flex-grow mx-4 rounded-2xl">
//             <input
//             type="text"
//             placeholder="Search by EPC or Bag ID"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full p-2 border rounded-md shadow focus:outline-none focus:ring-2 focus:ring-orange-500 text-black bg-gray-300"
//           />
//   </div>

//   <div className="py-2 px-5 bg-orenPos rounded cursor-pointer" onClick={handleScan} >
//     <h3 className="text-lg font-semibold">Scan</h3>
//   </div>
// </div>

//       <div className="bg-white rounded-b-lg shadowCard overflow-auto">
//         <table className="w-full text-left table-auto border-collapse">
//           <thead className="text-white">
//             <tr className="border-t-2 border-white bg-orange-500">
//               <th className="px-4 py-2 border border-gray-200">No</th>
//               <th className="px-4 py-2 border border-gray-200">EPC</th>
//               <th className="px-4 py-2 border border-gray-200">BAG ID</th>
//               <th className="px-4 py-2 border border-gray-200">Total Berat</th>
//               <th className="px-4 py-2 border border-gray-200">Nomor Seal</th>
//               <th className="px-4 py-2 border border-gray-200">From</th>
//               <th className="px-4 py-2 border border-gray-200">To</th>
//               <th className="px-4 py-2 border border-gray-200">Service</th>
//               <th className="px-4 py-2 border border-gray-200">
//               Receiver
//               </th>
//               <th className="px-4 py-2 border border-gray-200">
//                 Location
//               </th>
//               <th className="px-4 py-2 border border-gray-200">Tanggal Discan</th>
//               <th className="px-4 py-2 border border-gray-200">Tanggal Dibuat</th>
//             </tr>
//           </thead>
//           <tbody >
//             {/* Looping data dummy */}
//             {filteredData.map((data, index) => (
//               <tr
//                 key={data.id}
//                 className={`text-center cursor-pointer ${
//                   index % 2 === 0 ? "bg-gray-300" : "bg-white"
//                 }`}
//                 onClick={() => navigate(`/receiving/${data.id}`)}
//               >
                
//                 <td className="px-4 py-2 border-r  border-gray-500">
//                   {index + 1}
//                 </td>
//                 <td className="px-4 py-2 border-r border-l border-gray-500">
//                   {data.EPC}
//                 </td>
//                 <td className="px-4 py-2 border-r border-l border-gray-500">
//                   {data.PID}
//                 </td>
//                 <td className="px-4 py-2 border-r border-l border-gray-500">
//                   {data.weight}
//                 </td>
//                 <td className="px-4 py-2 border-r border-l border-gray-500">
//                   {data.sealNumber}
//                 </td>
//                 <td className="px-4 py-2 border-r border-l border-gray-500">
//                   {data.originLocation}
//                 </td>
//                 <td className="px-4 py-2 border-r border-l border-gray-500">
//                   {data.destination}
//                 </td>
//                 <td className="px-4 py-2 border-r border-l border-gray-500">
//                   {data.service}
//                 </td>
//                 <td className="px-4 py-2 border-r border-l border-gray-500">
//                   {data.created_rfid_by}
//                 </td>
//                 <td className="px-4 py-2 border-r border-l border-gray-500">
//                   {data.currentLocation}
//                 </td>
//                 <td className="px-4 py-2 border-r border-l border-gray-500">
//                   {data.updated_at}
//                 </td>
//                 <td className="px-4 py-2 border-r border-l border-gray-500">
//                   {data.created_at}
//                 </td>
//               </tr>
//             ))}
//             {/* Tampilkan jika no data found */}
//             {filteredData.length === 0 && (
//               <tr>
//                 <td colSpan={9} className="py-8">
//                   <div className="flex flex-col items-center justify-center">
//                     <img
//                       src={nodata}
//                       alt="No Data"
//                       className="w-40 mb-4"
//                     />
//                     <span className="text-gray-500">no data found</span>
//                   </div>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import nodata from "../../../public/nodata.png";
import { API_Header } from "../../libs";
import { receiving } from "../../dataTypes";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function RseceivingGate() {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [gateName, setGateName] = useState("");
  const [totalBag, setTotalBag] = useState(0);
  const [dataMovement, setDataMovement] = useState<receiving[]>([]);
  const [page, setPage] = useState(1); // Current page
  const [limit, setLimit] = useState(25); // Items per page
  const [totalItems, setTotalItems] = useState(0); // Total count of items

  const navigate = useNavigate();

  const handleScan = () => {
    navigate(`/gate/scan/${id}`);
  };

  const getData = async (id: any) => {
    try {
      setGateName("");
      setDataMovement([]);
      setTotalBag(0);

      const res = await API_Header.get(`/gate/${id}?limit=${limit}&page=${page}`);
      // console.log(res)
      setGateName(res.data.gateDetail.gateName);
      setDataMovement(res.data.data);
      setTotalBag(res.data.total);
      setTotalItems(res.data.total); // Set total items count
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(id);
  }, [id, page, limit]); // Re-fetch data when id, page, or limit changes

  // Calculate total pages
  const totalPages = Math.ceil(totalItems / limit);

  // Filter data based on searchTerm for EPC and PID (Bag ID)
  const filteredData = dataMovement.filter(
    (data) =>
      data.EPC.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.PID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen  bg-gray-300">
      {/* Header Section */}
      <h1 className="text-3xl font-bold text-center">{gateName}</h1>

      {/* Controls Section */}
      <div className="flex justify-between mb-4">
        <div>
          <label className="mr-2">Show:</label>
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="p-2 border rounded-md bg-white"
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-orange-500 text-white rounded-t-lg p-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Total Bag: {totalBag}</h3>

        {/* Search Input */}
        <div className="flex-grow mx-4 rounded-2xl">
          <input
            type="text"
            placeholder="Search by EPC or Bag ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-md shadow focus:outline-none focus:ring-2 focus:ring-orange-500 text-black bg-gray-300"
          />
        </div>

        <div className="py-2 px-5 bg-orenPos rounded cursor-pointer" onClick={handleScan}>
          <h3 className="text-lg font-semibold">Scan</h3>
        </div>
      </div>

      <div className="bg-white rounded-b-lg shadowCard overflow-auto">
        <table className="w-full text-left table-auto border-collapse">
          <thead className="text-white">
            <tr className="border-t-2 border-white bg-orange-500">
              <th className="px-4 py-2 border border-gray-200">No</th>
              <th className="px-4 py-2 border border-gray-200">EPC</th>
              <th className="px-4 py-2 border border-gray-200">BAG ID</th>
              <th className="px-4 py-2 border border-gray-200">Total Berat</th>
              <th className="px-4 py-2 border border-gray-200">Nomor Seal</th>
              <th className="px-4 py-2 border border-gray-200">From</th>
              <th className="px-4 py-2 border border-gray-200">To</th>
              <th className="px-4 py-2 border border-gray-200">Service</th>
              <th className="px-4 py-2 border border-gray-200">Receiver</th>
              <th className="px-4 py-2 border border-gray-200">Location</th>
              <th className="px-4 py-2 border border-gray-200">Tanggal Discan</th>
              <th className="px-4 py-2 border border-gray-200">Tanggal Dibuat</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((data, index) => (
              <tr
                key={data.id}
                className={`text-center cursor-pointer ${index % 2 === 0 ? "bg-gray-300" : "bg-white"}`}
                onClick={() => navigate(`/gate/movement/${data.PID}`)}
              >
                <td className="px-4 py-2 border-r border-gray-500">{index + 1}</td>
                <td className="px-4 py-2 border-r border-l border-gray-500">{data.EPC}</td>
                <td className="px-4 py-2 border-r border-l border-gray-500">{data.PID}</td>
                <td className="px-4 py-2 border-r border-l border-gray-500">{data.weight}</td>
                <td className="px-4 py-2 border-r border-l border-gray-500">{data.sealNumber}</td>
                <td className="px-4 py-2 border-r border-l border-gray-500">{data.originLocation}</td>
                <td className="px-4 py-2 border-r border-l border-gray-500">{data.destination}</td>
                <td className="px-4 py-2 border-r border-l border-gray-500">{data.service}</td>
                <td className="px-4 py-2 border-r border-l border-gray-500">{data.created_rfid_by}</td>
                <td className="px-4 py-2 border-r border-l border-gray-500">{data.currentLocation}</td>
                <td className="px-4 py-2 border-r border-l border-gray-500">{data.updated_at}</td>
                <td className="px-4 py-2 border-r border-l border-gray-500">{data.created_at}</td>
              </tr>
              
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={12} className="py-8">
                  <div className="flex flex-col items-center justify-center">
                    <img src={nodata} alt="No Data" className="w-40 mb-4" />
                    <span className="text-gray-500">no data found</span>
                  </div>
                </td>
              </tr>
            )}
            
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-center mt-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 mr-2 bg-orenPos text-white rounded cursor-pointer hover:bg-blue-800"
            disabled={page === 1}
          >
           <MdKeyboardArrowLeft  />
          </button>
          <span className="px-4">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-4 py-2 bg-orenPos text-white rounded cursor-pointer hover:bg-blue-800"
            disabled={page === totalPages}
          >
            <MdKeyboardArrowRight />
          </button>
        </div>
    </div>
  );
}
