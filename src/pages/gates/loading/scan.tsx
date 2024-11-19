import { useEffect, useState } from "react";
import nodata from "../../../../public/nodata.png";
import { useNavigate, useParams } from "react-router-dom";
import { API_Header, API_NIPOS, userDataJWT } from "../../../libs";
import  Cookies  from 'js-cookie';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import CSS untuk Toastify
import { Rings } from "react-loader-spinner";

export default function loadingScan() {
  const [loading, setloading] = useState<any[]>([]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [scanButton, setScanButton] = useState(true);
  const navigate = useNavigate();
  const [connoteResi, setConnoteResi] = useState(""); // State to hold connote_resi
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false)

  const tokenReader = Cookies.get("tokenReader");
  const readerIp = Cookies.get("readerIp");

  // Start scanning
  const handleScan = async () => {
    try {
      const response = await fetch(`/api/cloud/start`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenReader}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        setScanButton(true);
        setIsLoading(false); 
      } else {
        setScanButton(false);
        setIsLoading(true); 
        toast.success('Scan started');
      }
    } catch (error) {
      console.error('Error sending scan command:', error);
      setScanButton(true); 
      setIsLoading(false);
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
        setScanButton(true);
        setTimeout(() => {
          setloading([]);
        }, 500);
      }
    } catch (error) {
      console.error('Error sending Stop scan command:', error);
    } finally {
      setIsLoading(false); // Hentikan loading setelah berhenti
    }
  };

  
  // Send a single item to the inbound endpoint
  const sendToInbound = async (EPC: string) => {
    console.log(EPC)
    try {
      // Log the payload being sent to inspect the structure
      const response = await API_Header.post(`/loading`, { EPC });
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
        loading.map(async (item) => {
          try {
            await sendToInbound(item.EPC); // Send each item’s `id` as `rfid_tag_id`
          } catch (error) {
            console.error(`Error sending item ${item.id} to inbound:`, error);
            failedItems.push(item.id); // Collect failed items for later reference
          }
        })
      );
  
      if (failedItems.length === 0) {
        toast.success("All scanned data successfully!");
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
      console.log(res)
      if (res.data && res.data.data) {
        setloading((prev) => {
          // Avoid duplicates
          const exists = prev.some((item) => item.id === res.data.data.id);
          return exists ? prev : [...prev, res.data.data];
        });
      }
    } catch (error) {
      console.error("Error fetching tag details:", error);
    }
  };
  

  useEffect(() => {
    let ws : any;
    let reconnectAttempts = 0;
    const MAX_RECONNECT_ATTEMPTS = 5;
  
    const initializeWebSocket = () => {
      if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
        console.log('WebSocket already connected or connecting');
        return;
      }
  
      ws = new WebSocket(`wss://${readerIp}/ws?token=${tokenReader}`);
  
      ws.onopen = () => {
        console.log('WebSocket connection opened');
        reconnectAttempts = 0; // Reset attempts
        setIsLoading(false);
      };
  
      ws.onmessage = (event:any) => {
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
  
      ws.onerror = (error:any) => {
        console.error('WebSocket error:', error);
        handleStopScan();
      };
  
      ws.onclose = (event:any) => {
        console.log(`WebSocket closed: Code ${event.code}, Reason: ${event.reason}`);
        if (event.code === 3003 && reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
          reconnectAttempts++;
          setIsLoading(false);
          console.log(`Attempting to reconnect (${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})`);
          setTimeout(() => {
            initializeWebSocket();
          }, 5000); // Reconnect delay
        } else {
          console.error('Max reconnect attempts reached or closed cleanly');
          handleStopScan();
          setloading([])
          setIsLoading(false);
        }
      };
    };
  
    initializeWebSocket();
  
    return () => {
      if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
        ws.close();
      }
    };
  }, [readerIp, tokenReader]);
  
  
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
  
  const filteredloading = loading.filter((data) =>
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
          Total scanned items: {filteredloading.length}
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
        // <div></div>
        ) : (
          <button className="py-2 px-5 bg-red-500 rounded cursor-pointer" onClick={handleStopScan}>
            Stop
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
            {filteredloading.map((data, index) => (
              <tr key={index} className={`text-center ${index % 2 === 0 ? "bg-gray-300" : "bg-white"}`}>
                     <td className="px-4 py-2 border border-gray-500">{index + 1}</td>
                <td className="px-4 py-2 border-r border-l border-b border-gray-500">{data.PID}</td>
                <td className="px-4 py-2 border-r border-l border-b border-gray-500">{data.type}</td>
                <td className="px-4 py-2 border-r border-l border-b border-gray-500">{data.weight}</td>
                <td className="px-4 py-2 border-r border-l border-b border-gray-500">{data.packagesCount}</td>
                <td className="px-4 py-2 border-r border-l border-b border-gray-500">{data.destination}</td>
                <td className="px-4 py-2 border-r border-l border-b border-gray-500">{data.created_at}</td>
              </tr>
            ))}
            {filteredloading.length === 0 && !isLoading && (
              <tr>
              <td colSpan={7} className="py-8 text-center">
                <img src={nodata} alt="No Data" className="w-40 mb-4 mx-auto" />
                <span className="text-gray-500">No data found</span>
              </td>
            </tr>
          )}
          {isLoading && filteredloading.length === 0 && (
            <tr>
              <td colSpan={7} className="py-8 text-center">
                <div className="flex items-center justify-center flex-col">
                  <Rings
                    visible={true}
                    height={100}
                    width={100}
                    color="#1b2c5b"
                    ariaLabel="rings-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                  <span className="mt-4 text-gray-500">Scanning...</span>
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


