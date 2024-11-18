import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_Header, API_NIPOS } from '../../../libs'; // Pastikan path ini sesuai dengan lokasi file API_Header Anda
import { receiving } from '../../../dataTypes';

export default function DetailReceiving() {
  const { id } = useParams(); // Mendapatkan id dari parameter URL
  const [detail, setDetail] = useState<receiving>({
  BagID: '',
  PID: '',
  EPC: '',
  tag_status: '',
  packagesCount: 0,
  weight: '',
  total: 0,
  sealNumber: '',
  receiver_name: '',
  receiver_contact: '',
  originLocation: '',
  destination: '',
  status: '',
  service: '',
  updated_at: '',
  created_rfid_by: '',
  currentLocation: '',
  scanned_at: '',
  created_at: '',
  id: 0,
  })
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null); ;
const [connoteDetail, setConnoteDetail] = useState<any>(null);    
  // Fungsi untuk mengambil detail inbound berdasarkan ID
  const fetchDetail = async () => {
    try {
      const response = await API_Header.get(`/gate/movement/${id}`);
      setDetail(response.data.data);
    } catch (err) {
      console.error("Error fetching detail:", err);
      setError(err as Error); // Set error as Error type
    } finally {
      setLoading(false);
    }
  };

  const getDetailConnote = async () => {
    try {
      const response = await API_NIPOS.get(`/${id}`);
      console.log(response);
      setConnoteDetail(response.data);
    } catch (err) {
      console.error("Error fetching connote detail:", err);
      setError(err as Error); // Set error as Error type
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDetail();
      getDetailConnote();
    }
  }, [id]);


  if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  return (
    <div className="p-8 bg-orange-500 rounded-lg">
    <div className="max-w-5xl mx-auto">
      {/* Detail Movement Section */}
      <h2 className="text-3xl font-semibold mb-4 text-orenPos text-center ">Detail Movement - {detail.PID}</h2>
      <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Detail Bag - {detail.PID}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p><strong>EPC:</strong> {detail.EPC}</p>
          <p><strong>Tag Status:</strong> {detail.tag_status}</p>
          <p><strong>Bag Weight:</strong> {detail.weight} kg</p>
          <p><strong>Total Package:</strong> {detail.packagesCount}</p>
          <p><strong>Seal Number:</strong> {detail.sealNumber}</p>
          <p><strong>Service:</strong> {detail.service}</p>
          <p><strong>From:</strong> {detail.originLocation}</p>
          <p><strong>To:</strong> {detail.destination}</p>
          <p><strong>Receiver:</strong> {detail.created_rfid_by}</p>
          <p><strong>Current Location:</strong> {detail.currentLocation}</p>
          <p><strong>Scanned At:</strong> {detail.updated_at}</p>
        </div>
      </div>

      {/* Connote Detail Section */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Connote Detail</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p><strong>Service:</strong> {connoteDetail?.connote_service}</p>
          <p><strong>Current Location:</strong> {connoteDetail?.location_name}</p>
        </div>
      </div>

      {/* Sender and Receiver Data Sections in 2 Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Sender Data */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Sender Data</h3>
          <div className="grid grid-cols-1 gap-2">
            <p><strong>From:</strong> {connoteDetail?.connote_sender_address}</p>
            <p><strong>Sender:</strong> {connoteDetail?.connote_sender_name}</p>
            <p><strong>Sender Contact:</strong> {connoteDetail?.connote_sender_phone}</p>
          </div>
        </div>

        {/* Receiver Data */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Receiver Data</h3>
          <div className="grid grid-cols-1 gap-2">
            <p><strong>To:</strong> {connoteDetail?.connote_receiver_address}</p>
            <p><strong>Receiver:</strong> {connoteDetail?.connote_receiver_name}</p>
            <p><strong>Receiver Contact:</strong> {connoteDetail?.connote_receiver_phone}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
