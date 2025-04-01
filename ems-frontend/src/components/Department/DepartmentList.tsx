import { useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import { customStyles } from "../../utils/CustomStyles";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import { IDepartment } from "../../interfaces/Department";
import Loader from "../Common/Loader";
import { useGetDepartmentsQuery } from "../../services/apiSlice";

function DepartmentList() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const {
    data: departments = [],
    isLoading,
    isError,
    refetch,
  } = useGetDepartmentsQuery();

  if (isError) {
    toast.error("Failed to fetch departments.");
  }

  const filteredDepartments = departments
    .filter((dep: IDepartment) =>
      dep.dep_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((dep: IDepartment) => ({
      ...dep,
      action: <DepartmentButtons id={dep._id} onDelete={() => refetch()} />,
    }));

  return (
    <div className="p-4 sm:p-6">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Departments</h3>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center mt-5 gap-4">
            <input
              type="text"
              placeholder="Search By Dep Name"
              className="w-full sm:w-1/3 lg:w-1/5 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Link
              to="/admin-dashboard/department/add"
              className="w-full sm:w-auto px-4 py-2 bg-teal-600 rounded-md text-white text-center hover:bg-teal-700 transition"
            >
              Add New Department
            </Link>
          </div>
          <div className="mt-6 overflow-x-auto">
            <DataTable
              columns={columns}
              data={filteredDepartments}
              customStyles={customStyles}
              pagination
              responsive
            />
          </div>
        </>
      )}
    </div>
  );
}

export default DepartmentList;
