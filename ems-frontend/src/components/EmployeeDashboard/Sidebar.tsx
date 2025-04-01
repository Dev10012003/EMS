import {
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaTimes,
  FaUsers,
  FaChevronDown,
} from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { ISidebarProps } from "../../interfaces/Common";
import { useState } from "react";

function Sidebar({ isOpen, onClose }: ISidebarProps) {
  const authContext = useAuth();
  const location = useLocation();
  const [isSalaryOpen, setIsSalaryOpen] = useState(false);

  const isActiveRoute = (section: string) =>
    location.pathname.startsWith(`/employee-dashboard/${section}`);

  return (
    <div
      className={`
        bg-gray-800 text-white fixed left-0 top-0 bottom-0 w-64 transition-all duration-100 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:block
      `}
    >
      <div className="bg-teal-500 h-12 flex items-center justify-center">
        <h3 className="text-2xl text-center font-pacific">Employee MS</h3>
      </div>
      <div className="px-4 text-lg mt-5">
        <NavLink
          to="/employee-dashboard"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : ""
            } flex items-center space-x-4 py-2.5 px-4 rounded border-2 border-transparent
             hover:border-teal-300`
          }
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/profile/${authContext?.user?._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : ""
            } flex items-center space-x-4 py-2.5 px-4 rounded border-2 border-transparent
             hover:border-teal-300`
          }
          end
        >
          <FaUsers />
          <span>My Profile</span>
        </NavLink>

        <NavLink
          to="/employee-dashboard/leaves"
          className={`${
            isActiveRoute("leave") ? "bg-teal-500" : ""
          } flex items-center space-x-4 py-2.5 px-4 rounded border-2 border-transparent
             hover:border-teal-300`}
          end
        >
          <FaCalendarAlt />
          <span>Leaves</span>
        </NavLink>

        <div className="relative">
          <div
            className="flex items-center space-x-4 py-2.5 px-4 rounded cursor-pointer border-2 border-transparent
             hover:border-teal-300"
            onClick={() => setIsSalaryOpen(!isSalaryOpen)}
          >
            <FaMoneyBillWave />
            <span>Salary</span>
            <FaChevronDown
              className={`ml-auto transition-transform ${
                isSalaryOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {isSalaryOpen && (
            <div className="pl-8">
              <NavLink
                to={`/employee-dashboard/salary/history/${authContext?.user?._id}`}
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-teal-500" : ""
                  } flex items-center space-x-4 py-2.5 px-4 rounded border-2 border-transparent
             hover:border-teal-300`
                }
                end
              >
                <span>History</span>
              </NavLink>
              <NavLink
                to={`/employee-dashboard/salary/structure/${authContext?.user?._id}`}
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-teal-500" : ""
                  } flex items-center space-x-4 py-2.5 px-4 rounded border-2 border-transparent
             hover:border-teal-300`
                }
                end
              >
                <span>Structure</span>
              </NavLink>
            </div>
          )}
        </div>

        <NavLink
          to="/employee-dashboard/settings"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : ""
            } flex items-center space-x-4 py-2.5 px-4 rounded hover:border-2 hover:border-teal-300`
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
