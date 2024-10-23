import { useState } from 'react';
import { API, API_Header } from '../../libs';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Write() {
  const [formData, setFormData] = useState({
    EPC: '',
    PID: '',
    item_name: '',
    quantity: 1,
    item_description: '',
    weight: '',
    seal_number: '',
    destinationId: '',
    updatedBy: 1,
    last_location_id: 1,
  });

  // Function to handle form input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const navigate = useNavigate();
  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      const res = await API_Header.post('/rfid-tags', formData);
      if (res.data.status === 'success') {
        toast.success('Form Data Submitted Successfully!');
        setTimeout(() => {
          navigate('/scan');
        }, 3000);
      } else {
        toast.error(`${res.data.message}`);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error submitting form data.');
    }
  };

  return (
    <div>
      <h1>Write Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>EPC: </label>
          <input
            className="bg-orange-300"
            type="text"
            name="EPC"
            value={formData.EPC}
            onChange={handleChange}
          />
        </div>

        {/* Only show the rest of the form if TID is filled */}
        {formData.EPC && (
          <>
            <div>
              <label>PID: </label>
              <input
                className="bg-orange-300"
                type="text"
                name="PID"
                value={formData.PID}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Item Name: </label>
              <input
                className="bg-orange-300"
                type="text"
                name="item_name"
                value={formData.item_name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Quantity: </label>
              <input
                className="bg-orange-300"
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Item Description: </label>
              <input
                className="bg-orange-300"
                type="text"
                name="item_description"
                value={formData.item_description}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Weight: </label>
              <input
                className="bg-orange-300"
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Seal Number: </label>
              <input
                className="bg-orange-300"
                type="text"
                name="seal_number"
                value={formData.seal_number}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Destination ID: </label>
              <input
                className="bg-orange-300"
                type="number"
                name="destinationId"
                value={formData.destinationId}
                onChange={handleChange}
              />
            </div>



            <button type="submit" className="bg-blue-500">Submit</button>
          </>
        )}
      </form>
    </div>
  );
}
