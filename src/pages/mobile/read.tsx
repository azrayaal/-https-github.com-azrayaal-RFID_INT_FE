import { useState } from 'react';
import { toast } from 'react-toastify';
import { API } from '../../libs';
import { RfidTag } from '../../dataTypes';



export default function Read() {
  const [TID, setTID] = useState('');
  const [rfidData, setRfidData] = useState<RfidTag | null>(null); // State for fetched data

  // Function to handle input changes
  const handleChange = (e: any) => {
    setTID(e.target.value);
  };

  // Function to handle form submission
  const handleRead = async (e: any) => {
    e.preventDefault();
    try {
      const res = await API.post(`/rfid-tags/read`, { TID: TID });
      if (res.data.status === 'success') {
        setRfidData(res.data.data);
        toast.success(`${res.data.message}`);
      } else {
        toast.error(`${res.data.message}`);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error fetching RFID tag details.');
    }
  };

  return (
    <div>
      <h1>Read RFID Tag</h1>
      <form onSubmit={handleRead}>
        <div>
          <label>TID: </label>
          <input
            className="bg-orange-300"
            type="text"
            name="TID"
            value={TID}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="bg-blue-500">
          Read
        </button>
      </form>

      {rfidData && (
        <div className="min-h-screen p-8 bg-gray-100 mt-4">
          <h2 className="text-3xl font-bold mb-4">RFID Tag Details</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-auto">
            <table className="w-full text-left table-auto border-collapse">
              <thead className="text-white bg-orange-500">
                <tr>
                  <th className="px-4 py-2 border border-gray-200">Field</th>
                  <th className="px-4 py-2 border border-gray-200">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">TID</td>
                  <td className="border px-4 py-2">{rfidData.TID}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">EPC</td>
                  <td className="border px-4 py-2">{rfidData.EPC}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Item Name</td>
                  <td className="border px-4 py-2">{rfidData.item_name}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Quantity</td>
                  <td className="border px-4 py-2">{rfidData.quantity}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Item Description</td>
                  <td className="border px-4 py-2">{rfidData.item_description}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Last Location Name</td>
                  <td className="border px-4 py-2">{rfidData.last_location_name}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Last Location Address</td>
                  <td className="border px-4 py-2">{rfidData.last_location_address}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Updated By</td>
                  <td className="border px-4 py-2">{rfidData.updated_by}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Updated By Contact</td>
                  <td className="border px-4 py-2">{rfidData.updated_by_contact}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
