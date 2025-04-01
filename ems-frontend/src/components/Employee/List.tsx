import { useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { IEmployeeTableData } from "../../interfaces/Employee";
import { useGetEmployeesQuery } from "../../services/apiSlice";
import { customStyles } from "../../utils/CustomStyles";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
import Loader from "../Common/Loader";

function List() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: employees = [], isLoading, refetch } = useGetEmployeesQuery();

  const filteredEmployees = employees
    .filter((emp: IEmployeeTableData) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((emp: IEmployeeTableData) => ({
      ...emp,
      action: <EmployeeButtons id={emp._id} onDelete={() => refetch()} />,
    }));
  return (
    <div className="p-6">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Employees</h3>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center mt-5 gap-4">
            <input
              type="text"
              placeholder="Search By Emp Name"
              className="w-full sm:w-1/3 lg:w-1/5 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Link
              to="/admin-dashboard/employee/add"
              className="w-full sm:w-auto px-4 py-2 bg-teal-600 rounded-md text-white text-center hover:bg-teal-700 transition"
            >
              Add New Employee
            </Link>
          </div>
          <div className="mt-6 overflow-x-auto">
            <DataTable
              columns={columns}
              data={filteredEmployees}
              customStyles={customStyles}
              pagination
            />
          </div>
        </>
      )}
    </div>
  );
}

export default List;
