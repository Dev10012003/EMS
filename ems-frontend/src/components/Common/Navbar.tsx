import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useAuth } from "../../context/authContext";
import AdminSidebar from "../AdminDashboard/Sidebar";
import EmployeeSidebar from "../EmployeeDashboard/Sidebar";

function Navbar() {
  const authContext = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center text-white h-12 bg-teal-500 px-5 py-2">
        <button
          className="lg:hidden block"
          onClick={() => setIsSidebarOpen(true)}
        >
          <FaBars size={24} />
        </button>

        <p className="text-xl">
          Welcome,
          <span className="font-pacific capitalize">
            {authContext?.user?.name}
          </span>
        </p>

        <button
          className="px-5 bg-teal-700 hover:bg-teal-800 text-lg rounded py-1"
          onClick={authContext?.logout}
        >
          Logout
        </button>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          {authContext?.user?.role === "admin" ? (
            <AdminSidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
            />
          ) : (
            <EmployeeSidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
            />
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;
