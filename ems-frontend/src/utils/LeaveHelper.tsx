import { TableColumn } from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { IButtonProps } from "../interfaces/Common";
import { ILeaveData } from "../interfaces/Leave";
import { FaEye } from "react-icons/fa";

export const LeaveButtons: React.FC<IButtonProps> = ({ id }) => {
  const navigate = useNavigate();
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => navigate(`/admin-dashboard/leaves/${id}`)}
        className="sm:hidden bg-teal-600 hover:bg-teal-700 text-white rounded p-2"
      >
        <FaEye />
      </button>
      <button
        onClick={() => navigate(`/admin-dashboard/leaves/${id}`)}
        className="hidden sm:flex px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded items-center gap-2"
      >
        <span>View</span>
      </button>
    </div>
  );
};

export const columns: TableColumn<ILeaveData>[] = [
  {
    name: "S No",
    selector: (_row, index) => (index ?? 0) + 1,
    style: { fontSize: "16px" },
  },
  {
    name: "Emp ID",
    selector: (row) => row.employeeId,
    sortable: true,
    style: { fontSize: "16px" },
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    style: { fontSize: "16px" },
  },
  {
    name: "Leave Type",
    selector: (row) => row.leaveType,
    sortable: true,
    style: { fontSize: "16px" },
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    sortable: true,
    style: { fontSize: "16px" },
  },
  {
    name: "Days",
    selector: (row) => row.days,
    sortable: true,
    style: { fontSize: "16px" },
  },
  {
    name: "Status",
    selector: (row) => row.status,
    cell: (row) => (
      <span
        className={`font-semibold ${
          row.status === "Approved"
            ? "text-teal-600"
            : row.status === "Rejected"
            ? "text-red-600"
            : "text-gray-600"
        }`}
      >
        {row.status}
      </span>
    ),
    sortable: true,
    style: { fontSize: "16px" },
  },
  {
    name: "Action",
    cell: (row) => row.action,
    center: true,
  },
];
