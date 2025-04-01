import { Outlet } from "react-router-dom";
import Sidebar from "../components/EmployeeDashboard/Sidebar";
import Navbar from "../components/Common/Navbar";

function EmployeeDashboard() {
  return (
    <div>
      <Sidebar />
      <div className="flex-1 bg-gray-100 min-h-screen lg:ml-64">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

export default EmployeeDashboard;
