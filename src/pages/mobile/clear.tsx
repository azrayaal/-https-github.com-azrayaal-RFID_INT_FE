import { useState } from 'react';
import { toast } from 'react-toastify';
import {  API_Header } from '../../libs';
import { useNavigate } from 'react-router-dom';

export default function Clear() {
  const [EPC, setEPC] = useState('');

  // Function to handle input changes
  const handleChangeEPC = (e: any) => {
    setEPC(e.target.value);
  };

  const navigate = useNavigate();
  // Function to handle form submission (POST request to clear RFID data)
  const handleClear = async (e: any) => {
    e.preventDefault();
    try {
      const res = await API_Header.post(`/rfid-tags/clear`, {
        EPC: EPC,
      });

      if (res.data.status === 'success') {
        toast.success('RFID Tag Cleared Successfully!');
        setTimeout(() => {
          navigate('/scan');
        }, 3000);
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
          <label>EPC: </label>
          <input
            className="bg-orange-300"
            type="text"
            name="EPC"
            value={EPC}
            onChange={handleChangeEPC}
          />
        </div>

        <button type="submit" className="bg-blue-500">
          Clear RFID
        </button>
      </form>
    </div>
  );
}
