import { useEffect, useState } from "react";
import nodata from "../../../../public/nodata.png";
import { useNavigate, useParams } from "react-router-dom";
import { API_Header, API_NIPOS, userDataJWT } from "../../../libs";
import  Cookies  from 'js-cookie';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import CSS untuk Toastify

export default function ScanLoading() {
  const [receiving, setReceiving] = useState<any[]>([]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [scanButton, setScanButton] = useState(true);
  const navigate = useNavigate();
  const [connoteResi, setConnoteResi] = useState(""); // State to hold connote_resi
  const { id } = useParams();

  const tokenReader = Cookies.get("tokenReader");
  const readerIp = Cookies.get("readerIp");

  // Start scanning
  const handleScan = async () => {
    try {
      const response = await fetch(`/api/cloud/start`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenReader}`
        }
      });


      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        // toast.error('Failed to start scanning. Please press Stop button and try again')
        handleStopScan();
      } else {
        // toast.success('Scan command sent successfully.')
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
          'Authorization': `Bearer ${tokenReader}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
      } else {
        // console.log('Stop scan command sent successfully');
        // toast.error('Scan Stopped.')
        // setScanButton(true);
        setReceiving([]); // Clear the data in the table
        handleScan()
      }
    } catch (error) {
      console.error('Error sending Stop scan command:', error);
    }
  };
  
  // const handleStopScanBack = async () => {
  //   try {
  //     const response = await fetch(`/api/cloud/stop`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${tokenReader}`
  //       }
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       console.error('Server error:', errorData);
  //     } else {
  //       console.log('Stop scan command sent successfully');
  //       // toast.error('Scan Stopped.')
  //       setScanButton(true);
  //       setReceiving([]); // Clear the data in the table
  //     }
  //   } catch (error) {
  //     console.error('Error sending Stop scan command:', error);
  //   }
  // };

  // const updateResiNipos = async (connote_resi: string) => {
  //   try {
  //      const date = new Date();
  //      const formattedDate = date.toISOString().slice(0, 19).replace("T", " ");
  //      const response = await API_NIPOS.put(`/${connote_resi}`, {
  //       "connote_id": `${connote_resi}`,
  //       "connote_state": "R7",
  //       "currentLocation": {
  //         "name": `${userDataJWT?.locationName}`, // id location dari jwt token login
  //         "code": `${userDataJWT?.locationId}`,   //ambil dari code location
  //         "type": "Location",
  //         "is": "ORIGIN",
  //       },
  //       "content-history": [
  //         {
  //           "content": `Barang anda telah melewati proses Receiving oleh ${userDataJWT?.name} di ${userDataJWT?.locationName}`,
  //           "action": "R7",
  //           "created_at": formattedDate,
  //           "connote_code": `${connote_resi}`,
  //           "connote_state": "R7",
  //           "username": ` ${userDataJWT?.name}`,
  //           "location_name": `${userDataJWT?.locationName}`,
  //           "coordinate": `${userDataJWT?.cordinate}`
  //         }
  //       ]
  //     });
  //     console.log(response)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  
  // Send a single item to the inbound endpoint
  const sendToInbound = async (rfid_tag_id: string) => {
    try {
      // Log the payload being sent to inspect the structure
      const response = await API_Header.post(`/gate/${id}`, { rfid_tag_id, gate: id });
      if (response.data.success) {
        console.log("Data sent to inbound successfully:", response.data);
      }
    } catch (error) {
      console.error("Error sending data to inbound:", error);
    }
  };
  
  const sendAllToInbound = async () => {
    try {
      // await updateResiNipos(connoteResi);
      // await updateResiNipos();
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
        toast.success("All scanned data successfully!");
        // if (window.history.length > 1) {
        //   navigate(-1); // Navigate to the previous page if there is history
        // } else {
        //   navigate("/"); // Fallback to the home page or any specific route
        // }
      } else {
        toast.error(`Some items failed to send: ${failedItems.join(", ")}.`);
        navigate(-1);
      }
  
      handleStopScan();
    } catch (error) {
      console.error("Error sending all data to inbound:", error);
    }
  };
  
  const getTag = async (epc?: string): Promise<void> => {
    if (!epc) {
      console.error("No EPC provided");
      return;
    }
  
    try {
      const res = await API_Header.post("/rfid-tags/read", { EPC: epc });
      const status = res.data.status;
      if (status === "error") {
        toast.error(`Error fetching tag details: ${status}`);
        console.log("Error fetching tag details", res.data);
      }
      if (res.data && res.data.data) {
        setReceiving((prev) => [...prev, res.data.data]);
      }
    } catch (error) {
      console.error("Error fetching tag details:", error);
    }
  };
  
  useEffect(() => {
    handleScan();
    const ws = new WebSocket(`wss://${readerIp}/ws?token=${tokenReader}`);
  
    ws.onopen = () => {
      console.log('Opened WebSocket connection');
    };
  
    ws.onmessage = (event) => {
      const data = event.data;
  
      if (data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') processMessage(reader.result);
        };
  
        reader.readAsText(data);
      } else {
        processMessage(data);
      }
    };
  
    ws.onerror = (event) => {
      console.error('WebSocket error:', event);
      handleStopScan()
    };
  
    ws.onclose = (event) => {
      console.log(`WebSocket connection closed: Code ${event.code}, Reason: ${event.reason}`);
      
      // Panggil handleStopScan terlebih dahulu
      handleStopScan();
    
      // Tambahkan timeout kecil untuk memastikan handleStopScan selesai sebelum koneksi ditutup
      setTimeout(() => {
        ws.close();
      }, 100);
    };
    
  
    // Ensure connection closes properly when component unmounts
    return () => ws.close();
  }, []); // Empty dependency array to run this effect only once
  
  const processMessage = (message: string) => {
    try {
      const parsedData = JSON.parse(message);
      if (parsedData.type === 'SIMPLE' && parsedData.data?.format === 'epc') {
        getTag(parsedData.data.idHex);
      }
    } catch (err) {
      const jsonStrings = message.match(/\{(?:[^{}]|(?:\{[^{}]*\}))*\}/g);
      jsonStrings?.forEach((jsonString) => {
        try {
          const individualData = JSON.parse(jsonString);
          if (individualData.type === 'SIMPLE' && individualData.data?.format === 'epc') {
            getTag(individualData.data.idHex);
          }
        } catch (err: any) {
          console.log('Error parsing individual JSON object:', err.message);
        }
      });
    }
  };
  
  // Call `getTag` immediately for testing
  useEffect(() => {
    // Jika tidak ada `epc`, pastikan memberikan nilai default atau argumen contoh
    getTag(); // Ganti "default-epc" dengan nilai EPC tertentu jika diperlukan
  }, []);
  
  const filteredReceiving = receiving.filter((data) =>
    data.EPC?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.PID?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.item_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.location?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.destination?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-300">
      
      {/* <h1 className="text-3xl font-bold text-center pb-3">SCAN TAGS</h1> */}
      <div className="bg-orenPos text-white rounded-t-lg p-4 flex justify-between items-center">
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
          // <button className="py-2 px-5 bg-green-500 rounded cursor-pointer" onClick={handleScan}>
          //   Start
          // </button>
        <div></div>
        ) : (
          <button className="py-2 px-5 bg-red-500 rounded cursor-pointer" onClick={handleStopScan}>
            Refresh
          </button>
        )}
        <div className="p-4 flex justify-end">
  <button
    onClick={sendAllToInbound}
    className="py-2 px-5 bg-orange-500 text-white rounded"
  >
    Send
  </button>
</div>
      </div>

       
      <div className="bg-white rounded-b-lg shadowCard overflow-auto ">
        <table className="w-full text-left table-auto border-collapse">
          <thead className="text-white bg-orenPos">
            <tr>
            <th className="px-4 py-2 border border-gray-200">No</th>
              <th className="px-4 py-2 border border-gray-200">Bag Id</th>
              <th className="px-4 py-2 border border-gray-200">Type</th>
              <th className="px-4 py-2 border border-gray-200">Bag Weight</th>
              <th className="px-4 py-2 border border-gray-200">Total Package</th>
              <th className="px-4 py-2 border border-gray-200">Destination</th>
              <th className="px-4 py-2 border border-gray-200">Scanned At</th>
            </tr>
          </thead>
          <tbody>
            {filteredReceiving.map((data, index) => (
              <tr key={index} className={`text-center ${index % 2 === 0 ? "bg-gray-300" : "bg-white"}`}>
            <td className="px-4 py-2 border-r border-l border-gray-500">{data.PID}</td>
                <td className="px-4 py-2 border-r border-l border-gray-500">{data.type}</td>
                <td className="px-4 py-2 border-r border-l border-gray-500">{data.weight}</td>
                <td className="px-4 py-2 border-r border-l border-gray-500">{data.packagesCount}</td>
                <td className="px-4 py-2 border-r border-l border-gray-500">{data.destination}</td>
                <td className="px-4 py-2 border-r border-l border-gray-500">{data.movement_created_at}</td>
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


