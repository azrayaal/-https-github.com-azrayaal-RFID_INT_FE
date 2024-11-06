// import { useEffect, useState } from "react";
// import nodata from "../../../public/nodata.png";
// import { useNavigate } from "react-router-dom";
// import { API } from "../../libs";

// export default function ScanInbound() {
//   const [receiving, setReceiving] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//  const [scanButton, setScanButton] = useState(true);
//   const navigate = useNavigate();


//   const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJaRUJSQSIsImV4cCI6MTczMDQxNzA4N30._nzs4EbBSG13D7XIymsm79g-LN-O1VvS30Sbg9IzfMRdulrQttNiO1Xa2zi4GpxnGPqep3e1uCX0SuMUssJ73A';
//   const readerIp = '169.254.10.1'; // Ganti dengan IP reader yang sesuai
// const handleScan = async () => {
//   try {
//     const response = await fetch(`/api/cloud/start`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       }
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error('Server error:', errorData);
//     } else {
//       console.log('Scan command sent successfully');
//       setScanButton(false);
//     }
//   } catch (error) {
//     console.error('Error sending scan command:', error);
//   }
// };

// const handleStopScan = async () => {
//   try {
//     const response = await fetch(`/api/cloud/stop`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       }
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error('Server error:', errorData);
//     } else {
//       console.log('Stop scan command sent successfully');
//       setScanButton(true);
//     }
//   } catch (error) {
//     console.error('Error sending Stop scan command:', error);
//   }
// };
  

//   useEffect(() => {
//     const ws = new WebSocket(`wss://${readerIp}/ws?token=${token}`);

//     ws.onopen = () => {
//       console.log('Opened connection');
//     };

//     ws.onmessage = (event) => {
//       const data = event.data;
//       console.log(data)
//       // Jika data adalah Blob, baca sebagai teks
//       if (data instanceof Blob) {
//         const reader = new FileReader();
//         reader.onload = () => {
//           const textData = reader.result;
//           if (typeof textData === "string") {
//             processMessage(textData);
//           }
//         };
//         reader.readAsText(data);
//       } else {
//         // Jika data bukan Blob, langsung proses
//         processMessage(data);
//       }
//     };


//     const processMessage = (message: string) => {
//       try {
//         const parsedData = JSON.parse(message);
//         if (parsedData.type === "SIMPLE" && parsedData.data && parsedData.data.format === "epc") {
//           console.log("EPC idHex:", parsedData.data.idHex);
//           // Tambahkan data yang diterima ke dalam state
//           setReceiving((prev) => [...prev, parsedData.data]);
//         }
//       } catch (e) {
//         console.log("Received non-JSON data:", message);
//         const jsonStrings = message.match(/\{(?:[^{}]|(?:\{[^{}]*\}))*\}/g);
//         if (jsonStrings) {
//           jsonStrings.forEach((jsonString) => {
//             try {
//               const individualData = JSON.parse(jsonString);
//               if (individualData.type === "SIMPLE" && individualData.data && individualData.data.format === "epc") {
//                 console.log("EPC idHex:", individualData.data.idHex);
//                 setReceiving((prev) => [...prev, individualData.data]);
//               }
//             } catch (err: any) {
//               console.log("Error parsing individual JSON object:", err.message);
//             }
//           });
//         }
//       }
//     };

//     ws.onerror = (error) => {
//       console.error('Error:', error);
//     };

//     ws.onclose = (event) => {
//       console.log(`Connection closed: Code ${event.code}, Reason: ${event.reason}`);
//     };

//     return () => {
//       ws.close();
//     };
//   }, []);

//   // Filter data berdasarkan pencarian
//   const filteredReceiving = receiving.filter((data) =>
//     data.BagID?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen p-8 bg-gray-300">
//       <h1 className="text-3xl font-bold text-center">Scan Inbound</h1>
//       <div className="bg-orange-500 text-white rounded-t-lg p-4 flex justify-between items-center">
//         <h3 className="text-lg font-semibold">
//           Total scanned Bag: {filteredReceiving.length}
//         </h3>
//         <div className="flex-grow mx-4 rounded-2xl">
//           <input
//             type="text"
//             placeholder="Search by Bag ID"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full p-2 border rounded-md shadow focus:outline-none focus:ring-2 focus:ring-orange-500 text-black bg-gray-300"
//           />
//         </div>
//         <div
//           className="py-2 px-5 bg-orenPos rounded cursor-pointer"
//           onClick={handleScan}
//         >
//           <h3 className="text-lg font-semibold">Start</h3>
//         </div>
//       </div>

//       <div className="bg-white rounded-b-lg shadowCard overflow-auto">
//         <table className="w-full text-left table-auto border-collapse">
//           <thead className="text-white">
//             <tr className="border-t-2 border-white bg-orange-500">
//               <th className="px-4 py-2 border border-gray-200">No</th>
//               <th className="px-4 py-2 border border-gray-200">EPC idHex</th>
//               {/* Tampilkan kolom tambahan sesuai dengan data yang diperlukan */}
//             </tr>
//           </thead>
//           <tbody>
//             {receiving.map((data, index) => (
//               <tr
//                 key={index}
//                 className={`text-center ${index % 2 === 0 ? "bg-gray-300" : "bg-white"}`}
//               >
//                 <td className="px-4 py-2 border-r border-gray-500">{index + 1}</td>
//                 <td className="px-4 py-2 border-r border-l border-gray-500">{data.idHex}</td>
//               </tr>
//             ))}
//             {receiving.length === 0 && (
//               <tr>
//                 <td colSpan={8} className="py-8">
//                   <div className="flex flex-col items-center justify-center">
//                     <img src={nodata} alt="No Data" className="w-40 mb-4" />
//                     <span className="text-gray-500">No data found</span>
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

// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJaRUJSQSIsImV4cCI6MTczMDQyMDA1Mn0.YdZNickd4bkkuFdoHGbIr2btMlePp30tT5NO057f_zFt3UzaDQ-D0GlhIOQL0Rp-gA7TXZe8C7NNwCg6Ui6mnQ
import { useEffect, useState } from "react";
import nodata from "../../../public/nodata.png";
import { useNavigate } from "react-router-dom";
import { API_Header } from "../../libs";

export default function ScanInbound() {
  const [receiving, setReceiving] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [scanButton, setScanButton] = useState(true);
  const navigate = useNavigate();

  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJaRUJSQSIsImV4cCI6MTczMDQzNjM1M30.NCECA6LtaaCMAFRueke91hiJ_y0JdFUE4ZyRIhEHNFiFzAlpES_sYMlpUVLNmm5JnHYLf7UV9-4KmQgp4fo9BA';
  const readerIp = '169.254.10.1';

  // Start scanning
  const handleScan = async () => {
    try {
      const response = await fetch(`/api/cloud/start`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        setScanButton(false);
      } else {
        console.log('Scan command sent successfully');
        setScanButton(false);
      }
    } catch (error) {
      console.error('Error sending scan command:', error);
    }
  };

  // Stop scanning and clear table
  const handleStopScan = async () => {
    try {
      const response = await fetch(`/api/cloud/stop`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
      } else {
        console.log('Stop scan command sent successfully');
        setScanButton(true);
        setReceiving([]); // Clear the data in the table
      }
    } catch (error) {
      console.error('Error sending Stop scan command:', error);
    }
  };

  // Send a single item to the inbound endpoint
  const sendToInbound = async (rfid_tag_id: string) => {
    try {
      // Log the payload being sent to inspect the structure
      console.log("Sending data to inbound:", { rfid_tag_id });
      
      const response = await API_Header.post('/receive', { rfid_tag_id });
      if (response.data.success) {
        console.log("Data sent to inbound successfully:", response.data);
      }
    } catch (error) {
      console.error("Error sending data to inbound:", error);
    }
  };
  
  
  const sendAllToInbound = async () => {
    try {
      const failedItems:any = [];
      await Promise.all(
        receiving.map(async (item) => {
          try {
            await sendToInbound(item.id); // Send each item’s `id` as `rfid_tag_id`
          } catch (error) {
            console.error(`Error sending item ${item.id} to inbound:`, error);
            failedItems.push(item.id); // Collect failed items for later reference
          }
        })
      );
  
      if (failedItems.length === 0) {
        alert("All scanned data sent to inbound successfully!");
      } else {
        alert(`Some items failed to send: ${failedItems.join(", ")}.`);
      }
  
      handleStopScan();
      navigate("/receiving");
    } catch (error) {
      console.error("Error sending all data to inbound:", error);
    }
  };
  
  
  
  const getTag = async (epc: string) => {
    try {
      const res = await API_Header.post('/rfid-tags/read', { EPC: epc });
      if (res.data && res.data.data) {
        setReceiving((prev) => [...prev, res.data.data]);
      }
    } catch (error) {
      console.log("Error fetching tag details:", error);
    }
  };

  useEffect(() => {
    const ws = new WebSocket(`wss://${readerIp}/ws?token=${token}`);

    ws.onopen = () => console.log('Opened connection');
    ws.onmessage = (event) => {
      const data = event.data;
      if (data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") processMessage(reader.result);
        };
        reader.readAsText(data);
      } else {
        processMessage(data);
      }
    };
    ws.onerror = (error) => console.error('WebSocket error:', error);
    ws.onclose = (event) => console.log(`Connection closed: Code ${event.code}, Reason: ${event.reason}`);

    return () => ws.close();
  }, []);

  const processMessage = (message: string) => {
    try {
      const parsedData = JSON.parse(message);
      if (parsedData.type === "SIMPLE" && parsedData.data?.format === "epc") {
        getTag(parsedData.data.idHex);
      }
    } catch {
      const jsonStrings = message.match(/\{(?:[^{}]|(?:\{[^{}]*\}))*\}/g);
      jsonStrings?.forEach((jsonString) => {
        try {
          const individualData = JSON.parse(jsonString);
          if (individualData.type === "SIMPLE" && individualData.data?.format === "epc") {
            getTag(individualData.data.idHex);
          }
        } catch (err: any) {
          console.log("Error parsing individual JSON object:", err.message);
        }
      });
    }
  };

  const filteredReceiving = receiving.filter((data) =>
    data.EPC?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.PID?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.item_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.location?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.destination?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8 bg-gray-300">
      
      <h1 className="text-3xl font-bold text-center pb-3">SCAN INBOUND</h1>
      <div className="bg-orange-500 text-white rounded-t-lg p-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          Total scanned items: {filteredReceiving.length}
        </h3>
        <div className="flex-grow mx-4 rounded-2xl">
          <input
            type="text"
            placeholder="Search by EPC, PID, Item Name, Location, or Destination"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-md shadow focus:outline-none focus:ring-2 focus:ring-orange-500 text-black bg-gray-300"
          />
        </div>
        {scanButton ? (
          <button className="py-2 px-5 bg-green-500 rounded cursor-pointer" onClick={handleScan}>
            Start
          </button>
        ) : (
          <button className="py-2 px-5 bg-red-500 rounded cursor-pointer" onClick={handleStopScan}>
            Stop
          </button>
        )}
        <div className="p-4 flex justify-end">
  <button
    onClick={sendAllToInbound}
    className="py-2 px-5 bg-blue-500 text-white rounded"
  >
    Send All to Inbound
  </button>
</div>
      </div>

       
      <div className="bg-white rounded-b-lg shadowCard overflow-auto ">
        <table className="w-full text-left table-auto border-collapse">
          <thead className="text-white bg-orange-500">
            <tr>
              <th className="px-4 py-2 border border-gray-200">No</th>
              <th className="px-4 py-2 border border-gray-200">EPC</th>
              <th className="px-4 py-2 border border-gray-200">PID</th>
              <th className="px-4 py-2 border border-gray-200">Item Name</th>
              <th className="px-4 py-2 border border-gray-200">Weight</th>
              <th className="px-4 py-2 border border-gray-200">Seal Number</th>
              <th className="px-4 py-2 border border-gray-200">Quantity</th>
              <th className="px-4 py-2 border border-gray-200">Item Description</th>
              <th className="px-4 py-2 border border-gray-200">Location</th>
              <th className="px-4 py-2 border border-gray-200">Destination</th>
              <th className="px-4 py-2 border border-gray-200">Updated By</th>
            </tr>
          </thead>
          <tbody>
            {filteredReceiving.map((data, index) => (
              <tr key={index} className={`text-center ${index % 2 === 0 ? "bg-gray-300" : "bg-white"}`}>
                <td className="px-4 py-2 border border-gray-500">{index + 1}</td>
                <td className="px-4 py-2 border border-gray-500">{data.EPC}</td>
                <td className="px-4 py-2 border border-gray-500">{data.PID}</td>
                <td className="px-4 py-2 border border-gray-500">{data.item_name}</td>
                <td className="px-4 py-2 border border-gray-500">{data.weight}</td>
                <td className="px-4 py-2 border border-gray-500">{data.seal_number}</td>
                <td className="px-4 py-2 border border-gray-500">{data.quantity}</td>
                <td className="px-4 py-2 border border-gray-500">{data.item_description}</td>
                <td className="px-4 py-2 border border-gray-500">{data.location?.name} - {data.location?.address}</td>
                <td className="px-4 py-2 border border-gray-500">{data.destination?.name} - {data.destination?.address}</td>
                <td className="px-4 py-2 border border-gray-500">{data.updated_by?.name} ({data.updated_by?.contact})</td>
              </tr>
            ))}
            {filteredReceiving.length === 0 && (
              <tr>
                <td colSpan={11} className="py-8 text-center">
                  <img src={nodata} alt="No Data" className="w-40 mb-4 mx-auto" />
                  <span className="text-gray-500">No data found</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
