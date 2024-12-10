import Cookies from 'js-cookie';
import  {  useState } from 'react';
// import { API } from '../../libs';
import { toast } from 'react-toastify';

export default function Settings() {
  const [username, setUserName] = useState('admin');
  const [password, setPassword] = useState('!ReaderFX9600');
  const [readerIp, setReaderIp] = useState('169.254.10.1');
  // const [tokenReader, setTokenReader] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = async (event: any) => {
    event.preventDefault();
    Cookies.set('readerIp', readerIp, { expires: 7 });
    toast.success('Form submitted successfully!');
  };

  const handleSubmitLoginReader = async (event: any) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/cloud/localRestLogin`, {
        method: 'GET',
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(`${username}:${password}`), // Masukkan header Authorization di dalam headers
        },
      });
  
      if (!response.ok) {
        // Jika ada error, periksa apakah respons memiliki JSON
        let errorData;
        try {
          errorData = await response.json();
        } catch (error) {
          console.error('Server error: Response is not JSON');
        }
        console.error('Server error:', errorData);
      } else {
        // Jika respons berhasil, periksa apakah ada konten JSON
        let data;
        try {
          data = await response.json();
          Cookies.set('tokenReader', data.message, { expires: 7 });
          toast.success('Login successful!');
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  

  return (
    <div className="p-8">
      <div className="flex justify-between">
        {/* Form pertama */}
        <div className="w-1/2 pr-4">
          <h2 className="text-2xl font-bold mb-6">Input Data Reader</h2>
          <div className="pb-5">
            <form onSubmit={handleSubmit}>
              <label htmlFor="readerIp" className="block text-sm font-medium text-gray-600">
                Reader IP:
              </label>
              <input
                type="text"
                id="readerIp"
                name="readerIp"
                value={readerIp}
                onChange={(e) => setReaderIp(e.target.value)}
                required
                className="mt-1 mb-4 p-2 border-2 border-orenPos rounded w-full text-white bg-orange-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-orenPos text-white font-semibold rounded hover:bg-orange-500 disabled:"
              >
                Submit
              </button>
            </form>
          </div>

          <form onSubmit={handleSubmitLoginReader}>
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="mt-1 mb-4 p-2 border-2 border-orenPos rounded w-full text-white bg-orange-500"
            />

<label htmlFor="password" className="block text-sm font-medium text-gray-600">
        Password:
      </label>
      <input
        type={showPassword ? 'text' : 'password'} // Ubah tipe input berdasarkan state showPassword
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="mt-1 mb-4 p-2 border-2 border-orenPos rounded w-full text-white bg-orange-500"
      />

      <div className="flex items-center pb-5">
        <input
          type="checkbox"
          id="showPassword"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)} // Toggle state showPassword
          className="mr-2 "
        />
        <label htmlFor="showPassword" className="text-sm text-gray-600 ">
          Show Password
        </label>
      </div>

            <button
              type="submit"
              className="px-4 py-2 bg-orenPos text-white font-semibold rounded hover:bg-orange-500"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Form kedua */}
        <div className="w-1/2 pl-4">
          <h2 className="text-2xl font-bold mb-6">Input Data NIPOS</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="gateNameNIPOS" className="block text-sm font-medium text-gray-600">
              API NIPOS:
            </label>
            <input
              type="text"
              id="gateNameNIPOS"
              name="gate_name_nipos"
              required
              className="mt-1 mb-4 p-2 border-2 border-orenPos rounded w-full text-white bg-orange-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-orenPos text-white font-semibold rounded hover:bg-orange-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
