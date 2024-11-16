import { useEffect, useState } from "react";
import { API, API_Header } from "../../libs";
import { Link } from "react-router-dom";

export default function Home() {
  const [totalIdleTags, setTotalIdleTags] = useState(0);
  const [totalInUseTags, setTotalInUseTags] = useState(0);
  const [totalInbound, setTotalInbound] = useState(0);
  const [totalOutbound, setTotalOutbound] = useState(0);
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [gate, setGate] = useState([]);

  const getTotalIdleTags = async () => {
    try {
      const res = await API_Header.get('/rfid-tags/idle');
      setTotalIdleTags(res.data.total);
    } catch (error) {
      console.error(error);
    }
  };

  const getTotalInUseTags = async () => {
    try {
      const res = await API_Header.get('/rfid-tags/inuse');
      setTotalInUseTags(res.data.total);
    } catch (error) {
      console.error(error);
    }
  };

  const getGate = async () => {
    try {
      const res = await API_Header.get('/gate');
      setGate(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    getTotalIdleTags();
    getTotalInUseTags();
    getGate();

    // Update the date and time every second
    const intervalId = setInterval(() => {
      const today = new Date();
      const formattedDate = today.toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const formattedTime = today.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      setCurrentDate(formattedDate);
      setCurrentTime(formattedTime);
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Live Time Card */}
        <div className="bg-white rounded-lg shadowCard p-6">
          <h2 className="text-xl font-semibold text-gray-500">Live Time</h2>
          <div className="text-4xl font-bold text-blue-600 my-2">
            {currentTime}
          </div>
          <div className="text-gray-500">
            {currentDate}
          </div>
        </div>

        {/* Tag Count Card */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to={`/inusetags`} className="hover:shadow-2xl">
          <div className="bg-orenPos text-white rounded-lg shadowCard p-6">
            <h2 className="text-xl font-semibold">In Use Tags</h2>
            <div className="text-4xl font-bold my-2">{totalInUseTags}</div>
            <div className="">--</div>
          </div>
          </Link>
          
          <Link to={`/idletags`} className="hover:shadow-2xl">
          <div className="bg-orenPos text-white rounded-lg shadowCard p-6">
            <h2 className="text-xl font-semibold">Idle Tags</h2>
            <div className="text-4xl font-bold my-2">{totalIdleTags}</div>
            <div className="">--</div>
          </div>
          </Link>
        </div>
      </div>
      
      {/* Inbound/Outbound Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {gate.map((data: any) => (
          <Link to={`/gate/${data.id}`} className="hover:shadow-2xl" key={data.id}>
          <div className="bg-orenPos text-white rounded-lg shadowCard p-6" key={data.id}>
          <h2 className="text-xl font-semibold">{data.gateName}</h2>
          <div className="text-4xl font-bold my-2">- - -</div>
          <div className="text-gray-200">---</div>
        </div>
          </Link>
        ))}
        <Link to='/scan' className="hover:shadow-2xl">
          <div className="bg-orenPos text-white rounded-lg shadowCard p-6">
            <h2 className="text-xl font-semibold">Scan</h2>
            <div className="text-4xl font-bold my-2">- - -</div>
            <div className="text-gray-200">Read / Clear Tag</div>
          </div>
        </Link>
      </div>
    </>
  );
}
