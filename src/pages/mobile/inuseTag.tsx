import { useState, useEffect } from 'react';
import { API, API_Header } from '../../libs';
import { RfidTag } from '../../dataTypes';
import nodata from "../../../public/nodata.png"

export default function InUseTags() {
  const [tags, setTags] = useState<RfidTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API_Header.get('/rfid-tags/inuse');
        if (response.data.status === 'success') {
          setTags(response.data.data);
          console.log(response.data.data)
        } else {
          setError('Failed to fetch RFID tags.');
        }
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">RFID Tags - In Use</h1>

      <div className="bg-orenPos text-white rounded-t-lg p-4">
        <h3 className="text-lg font-semibold">Total RFID Tags: {tags.length}</h3>
      </div>

      <div className="bg-white rounded-b-lg shadowCard overflow-auto">
      <table className="w-full text-left table-auto border-collapse">
          <thead className="text-white">
            <tr className="border-t-2 border-white bg-orenPos">
              <th className="px-4 py-2 border border-gray-200">No</th>
              <th className="px-4 py-2 border border-gray-200">EPC</th>
              <th className="px-4 py-2 border border-gray-200">BAG ID</th>
              <th className="px-4 py-2 border border-gray-200">Total Berat</th>
              <th className="px-4 py-2 border border-gray-200">Nomor Seal</th>
              <th className="px-4 py-2 border border-gray-200">From</th>
              <th className="px-4 py-2 border border-gray-200">To</th>
              <th className="px-4 py-2 border border-gray-200">Service</th>
              <th className="px-4 py-2 border border-gray-200">
              Receiver
              </th>
              <th className="px-4 py-2 border border-gray-200">
                Location
              </th>
              <th className="px-4 py-2 border border-gray-200">Tanggal Discan</th>
              <th className="px-4 py-2 border border-gray-200">Tanggal Dibuat</th>
            </tr>
          </thead>
          <tbody >
            {/* Looping data dummy */}
            {tags.map((data, index) => (
              <tr
                key={data.id}
                className={`text-center cursor-pointer ${
                  index % 2 === 0 ? "bg-gray-300" : "bg-white"
                }`}
                // onClick={() => navigate(`/receiving/${data.id}`)}
              >
                
                <td className="px-4 py-2 border-r  border-gray-500">
                  {index + 1}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {data.EPC}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {data.PID}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {data.weight}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {data.sealNumber}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {data.originLocation}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {data.destination}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {data.service}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {data.created_rfid_by}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {data.currentLocation}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {data.updated_at}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {data.created_at}
                </td>
              </tr>
            ))}
            {/* Tampilkan jika no data found */}
            {tags.length === 0 && (
              <tr>
                <td colSpan={9} className="py-8">
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src={nodata}
                      alt="No Data"
                      className="w-40 mb-4"
                    />
                    <span className="text-gray-500">no data found</span>
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
