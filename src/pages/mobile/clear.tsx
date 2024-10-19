import { useState } from 'react';
import { toast } from 'react-toastify';
import { API } from '../../libs';

export default function Clear() {
  const [TID, setTID] = useState('');
  const [updatedBy, setUpdatedBy] = useState(1); // Default updatedBy = 1, bisa diubah sesuai kebutuhan

  // Function to handle input changes
  const handleChangeTID = (e: any) => {
    setTID(e.target.value);
  };

  const handleChangeUpdatedBy = (e: any) => {
    setUpdatedBy(e.target.value);
  };

  // Function to handle form submission (POST request to clear RFID data)
  const handleClear = async (e: any) => {
    e.preventDefault();
    try {
      const res = await API.post(`/rfid-tags/clear`, {
        TID: TID,
        updatedBy: updatedBy,
      });

      if (res.data.status === 'success') {
        toast.success('RFID Tag Cleared Successfully!');
      } else {
        toast.error(`Failed to clear RFID tag: ${res.data.message}`);
      }
    } catch (error) {
      console.error(error);
      toast.error('Error clearing RFID tag.');
    }
  };

  return (
    <div>
      <h1>Clear RFID Tag</h1>
      <form onSubmit={handleClear}>
        <div>
          <label>TID: </label>
          <input
            className="bg-orange-300"
            type="text"
            name="TID"
            value={TID}
            onChange={handleChangeTID}
          />
        </div>

        <div>
          <label>Updated By: </label>
          <input
            className="bg-orange-300"
            type="number"
            name="updatedBy"
            value={updatedBy}
            onChange={handleChangeUpdatedBy}
          />
        </div>

        <button type="submit" className="bg-blue-500">
          Clear RFID
        </button>
      </form>
    </div>
  );
}
