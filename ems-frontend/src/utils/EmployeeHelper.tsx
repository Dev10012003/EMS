import { TableColumn } from "react-data-table-component";
import {
  FaCalendarAlt,
  FaEdit,
  FaEye,
  FaMoneyBillWave,
  FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IButtonWithDeleteProps } from "../interfaces/Common";
import { IEmployeeTableData } from "../interfaces/Employee";
import { useDeleteEmployeeMutation } from "../services/apiSlice";
import { handleAxiosError } from "./ErrorHandler";

export const EmployeeButtons: React.FC<IButtonWithDeleteProps> = ({
  id,
  onDelete,
}) => {
  const navigate = useNavigate();
  const [deleteEmployee] = useDeleteEmployeeMutation();

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Do you want to Delete ?");
    if (confirm) {
      try {
        const response = await deleteEmployee(id).unwrap();
        if (response.success) {
          toast.success(response.message);
          onDelete(id);
        }
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };

  return (
    <div className="flex gap-2 overflow-x-auto whitespace-nowrap items-center">
      <button
        onClick={() => navigate(`/admin-dashboard/employee/${id}`)}
        className="sm:hidden bg-teal-600 hover:bg-teal-700 text-white rounded p-2"
      >
        <FaEye />
      </button>
      <button
        onClick={() => navigate(`/admin-dashboard/employee/${id}`)}
        className="hidden sm:flex px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded items-center gap-2"
      >
        <span>View</span>
      </button>
      <button
        onClick={() => navigate(`/admin-dashboard/employee/edit/${id}`)}
        className="sm:hidden bg-blue-600 hover:bg-blue-700 text-white rounded p-2"
      >
        <FaEdit />
      </button>
      <button
        onClick={() => navigate(`/admin-dashboard/employee/edit/${id}`)}
        className="hidden sm:flex px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded items-center gap-2"
      >
        <span>Edit</span>
      </button>
      <button
        onClick={() => navigate(`/admin-dashboard/employee/salary/${id}`)}
        className="sm:hidden bg-amber-500 hover:bg-amber-600 text-white rounded p-2"
      >
        <FaMoneyBillWave />
      </button>
      <button
        onClick={() => navigate(`/admin-dashboard/employee/salary/${id}`)}
        className="hidden sm:flex px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded items-center gap-2"
      >
        <span>Salary</span>
      </button>
      <button
        onClick={() => navigate(`/admin-dashboard/employee/leave/${id}`)}
        className="sm:hidden bg-gray-600 hover:bg-gray-700 text-white rounded p-2"
      >
        <FaCalendarAlt />
      </button>
      <button
        onClick={() => navigate(`/admin-dashboard/employee/leave/${id}`)}
        className="hidden sm:flex px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded items-center gap-2"
      >
        <span>Leave</span>
      </button>
      <button
        onClick={() => handleDelete(id)}
        className="sm:hidden bg-red-600 hover:bg-red-700 text-white rounded p-2"
      >
        <FaTrash />
      </button>
      <button
        onClick={() => handleDelete(id)}
        className="hidden sm:flex px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded items-center gap-2"
      >
        <span>Delete</span>
      </button>
    </div>
  );
};

export const columns: TableColumn<IEmployeeTableData>[] = [
  {
    name: "S No",
    selector: (_row, index) => (index ?? 0) + 1,
    width: "150px",
    style: { fontSize: "16px" },
  },
  {
    name: "Image",
    cell: (row) => (
      <img
        src={row.profileImage}
        alt={row.name}
        className="w-14 h-14 rounded-full object-cover border p-1"
      />
    ),
    sortable: false,
    width: "250px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "250px",
    style: { fontSize: "16px" },
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    sortable: true,
    width: "250px",
    style: { fontSize: "16px" },
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "250px",
    style: { fontSize: "16px" },
  },
  {
    name: "Action",
    cell: (row) => row.action,
    center: true,
  },
];
