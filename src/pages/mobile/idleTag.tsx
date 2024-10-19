import { useState, useEffect } from 'react';
import { API } from '../../libs';
import { RfidTag } from '../../dataTypes';



export default function IdleTags() {
  const [tags, setTags] = useState<RfidTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get('/rfid-tags/idle');
        setTags(response.data.data);
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
      <h1 className="text-3xl font-bold mb-6">RFID Tags - Idle</h1>

      <div className="bg-orange-500 text-white rounded-t-lg p-4">
        <h3 className="text-lg font-semibold">Total RFID Tags: {tags.length}</h3>
      </div>

      <div className="bg-white rounded-b-lg shadowCard overflow-auto">
        <table className="w-full text-left table-auto border-collapse">
          <thead className="text-white">
            <tr className="border-t-2 border-white bg-orange-500">
              <th className="px-4 py-2 border border-gray-200">No</th>
              <th className="px-4 py-2 border border-gray-200">TID</th>
              <th className="px-4 py-2 border border-gray-200">EPC</th>
              <th className="px-4 py-2 border border-gray-200">Item Name</th>
              <th className="px-4 py-2 border border-gray-200">Quantity</th>
              <th className="px-4 py-2 border border-gray-200">Description</th>
              <th className="px-4 py-2 border border-gray-200">
                Last Location
              </th>
              <th className="px-4 py-2 border border-gray-200">Updated By</th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag, index) => (
              <tr
                key={tag.TID}
                className={`text-center ${
                  index % 2 === 0 ? 'bg-gray-300' : 'bg-white'
                }`}
              >
                <td className="px-4 py-2 border-r border-gray-500">
                  {index + 1}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {tag.TID}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {tag.EPC}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {tag.item_name}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {tag.quantity}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {tag.item_description}
                </td>
                <td className="px-4 py-2 border-r border-l border-gray-500">
                  {tag.last_location_name} - {tag.last_location_address}
                </td>
                <td className="px-4 py-2 border-l border-gray-500">
                  {tag.updated_by} ({tag.updated_by_contact})
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
