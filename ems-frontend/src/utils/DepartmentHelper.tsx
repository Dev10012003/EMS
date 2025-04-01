import { TableColumn } from "react-data-table-component";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IDepartmentTable } from "../interfaces/Department";
import { API_BASE_URL } from "./Constant";
import { IApiResponse, IButtonWithDeleteProps } from "../interfaces/Common";
import { handleAxiosError } from "./ErrorHandler";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDeleteDepartmentMutation } from "../services/apiSlice";

export const columns: TableColumn<IDepartmentTable>[] = [
  {
    name: "S No",
    selector: (_row, index) => (index ?? 0) + 1,
    style: { fontSize: "16px" },
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true,
    style: { fontSize: "16px" },
  },
  {
    name: "Action",
    cell: (row) => row.action,
    center: true,
  },
];

export const DepartmentButtons: React.FC<IButtonWithDeleteProps> = ({
  id,
  onDelete,
}) => {
  const navigate = useNavigate();
  const [deleteDepartment] = useDeleteDepartmentMutation();

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Do you want to delete?");
    if (confirm) {
      try {
        const response = await deleteDepartment(id).unwrap();
        if (response.success) {
          toast.success(response.message);
          onDelete(id);
        }
      } catch (error: any) {
        handleAxiosError(error);
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => navigate(`/admin-dashboard/department/${id}`)}
        className="sm:hidden bg-teal-600 hover:bg-teal-700 text-white rounded p-2"
      >
        <FaEdit />
      </button>
      <button
        onClick={() => handleDelete(id)}
        className="sm:hidden bg-red-600 hover:bg-red-700 text-white rounded p-2"
      >
        <FaTrash />
      </button>
      <button
        onClick={() => navigate(`/admin-dashboard/department/${id}`)}
        className="hidden sm:inline-flex px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded text-sm"
      >
        Edit
      </button>
      <button
        onClick={() => handleDelete(id)}
        className="hidden sm:inline-flex px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
      >
        Delete
      </button>
    </div>
  );
};
