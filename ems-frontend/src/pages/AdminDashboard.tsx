import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminDashboard/Sidebar";
import Navbar from "../components/Common/Navbar";

function AdminDashboard() {
  return (
    <div>
      <AdminSidebar />
      <div className="flex-1 bg-gray-100 min-h-screen lg:ml-64">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;
