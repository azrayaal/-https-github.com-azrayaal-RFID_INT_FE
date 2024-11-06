import { useParams } from "react-router-dom";

export default function ReceivingGate() {
  const { gateName } = useParams();

  return (
    <div>
      <h1>Gate: {gateName}</h1>
      {/* Konten khusus untuk gate tertentu */}
    </div>
  );
}
