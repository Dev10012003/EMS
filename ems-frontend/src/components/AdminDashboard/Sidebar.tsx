import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaTimes,
  FaUsers,
} from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import { ISidebarProps } from "../../interfaces/Common";

function Sidebar({ isOpen, onClose }: ISidebarProps) {
  const location = useLocation();

  const isActiveRoute = (section: string) =>
    location.pathname.startsWith(`/admin-dashboard/${section}`);

  return (
    <div
      className={`
        bg-gray-800 text-white fixed left-0 top-0 bottom-0 w-64 transition-all duration-100 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:block
      `}
    >
      <div className={`bg-teal-500 h-12 flex items-center justify-center`}>
        <h3 className="text-2xl text-center font-pacific">Employee MS</h3>
      </div>
      <div className="px-4 text-lg mt-5">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `${isActive ? `bg-teal-500` : ""} 
            flex items-center space-x-4 py-2.5 px-4 rounded border-2 border-transparent
             hover:border-teal-300`
          }
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/employees"
          className={`${
            isActiveRoute("employee") ? `bg-teal-500` : ""
          } flex items-center space-x-4 py-2.5 px-4 rounded border-2 border-transparent
             hover:border-teal-300`}
          end
        >
          <FaUsers />
          <span>Employee</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/departments"
          className={`${
            isActiveRoute("department") ? `bg-teal-500` : ""
          } flex items-center space-x-4 py-2.5 px-4 rounded border-2 border-transparent
             hover:border-teal-300`}
          end
        >
          <FaBuilding />
          <span>Department</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/leaves"
          className={`${
            isActiveRoute("leave") ? `bg-teal-500` : ""
          } flex items-center space-x-4 py-2.5 px-4 rounded border-2 border-transparent
             hover:border-teal-300`}
          end
        >
          <FaCalendarAlt />
          <span>Leave</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/salary/add"
          className={`${
            isActiveRoute("salary") ? `bg-teal-500` : ""
          } flex items-center space-x-4 py-2.5 px-4 rounded border-2 border-transparent
             hover:border-teal-300`}
          end
        >
          <FaMoneyBillWave />
          <span>Salary Structure</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/settings"
          className={({ isActive }) =>
            `${isActive ? `bg-teal-500` : ""} 
            flex items-center space-x-4 py-2.5 px-4 rounded border-2 border-transparent
             hover:border-teal-300`
          }
          end
        >
          <FaCogs />
          <span>Settings</span>
        </NavLink>
      </div>

      {isOpen && (
        <button
          className="absolute top-3 left-4 text-white lg:hidden"
          onClick={onClose}
        >
          <FaTimes size={24} />
        </button>
      )}
    </div>
  );
}

export default Sidebar;
