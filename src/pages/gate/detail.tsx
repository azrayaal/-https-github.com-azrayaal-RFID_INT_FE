import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_Header } from '../../libs'; // Pastikan path ini sesuai dengan lokasi file API_Header Anda
import { receiving } from '../../dataTypes';

export default function DetailInbound() {
  const { id } = useParams(); // Mendapatkan id dari parameter URL
  const [detail, setDetail] = useState<receiving>({
    BagID: '',
    weight: '',
    total: 0,
    receiver_name: '',
    receiver_contact: '',
    destination: '',
    status: '',
    scanned_at: '',
    id: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fungsi untuk mengambil detail inbound berdasarkan ID
  const fetchDetail = async () => {
    try {
      const response = await API_Header.get(`/receive/${id}`);
      setDetail(response.data.data);
      console.log(response)
    } catch (err) {
      console.error('Error fetching detail:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDetail();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Detail Inbound - {detail.BagID}</h2>
      <div className="bg-white shadow rounded p-4">
        <p><strong>Bag ID:</strong> {detail.BagID}</p>
        <p><strong>Bag Weight:</strong> {detail.weight} kg</p>
        <p><strong>Total Package:</strong> {detail.total}</p>
        <p><strong>Receiver:</strong> {detail.receiver_name}</p>
        <p><strong>Receiver Contact:</strong> {detail.receiver_contact}</p>
        <p><strong>Location:</strong> {detail.destination}</p>
        <p><strong>Status:</strong> {detail.status}</p>
        <p><strong>Scanned At:</strong> {detail.scanned_at}</p>
      </div>
    </div>
  );
}
