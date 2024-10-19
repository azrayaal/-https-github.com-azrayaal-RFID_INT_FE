import Navbar from "../component/navbar";
import Sidebar from "../component/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Container Sidebar dan Konten Utama */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-auto bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
