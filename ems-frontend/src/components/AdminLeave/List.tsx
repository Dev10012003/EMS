import DataTable from "react-data-table-component";
import { ILeaveData } from "../../interfaces/Leave";
import { useGetLeavesQuery } from "../../services/apiSlice";
import { customStyles } from "../../utils/CustomStyles";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";
import Loader from "../Common/Loader";
import { useState } from "react";

function List() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const { data: leaves = [], isLoading } = useGetLeavesQuery();
  const status = ["Pending", "Approved", "Rejected"];

  const filteredLeaves = leaves
    .filter((leave: ILeaveData) =>
      leave.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((leave: ILeaveData) =>
      statusFilter ? leave.status === statusFilter : true
    )
    .map((leave: ILeaveData) => ({
      ...leave,
      action: <LeaveButtons id={leave._id} />,
    }));

  return (
    <div className="p-6">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Leaves</h3>
          </div>
          <div className="flex flex-wrap gap-3 justify-between items-center mt-5">
            <input
              type="text"
              placeholder="Search By Emp Id"
              className={`w-full sm:w-1/3 lg:w-1/5 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-950`}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 w-full sm:w-auto">
              {status.map((status) => (
                <button
                  key={status}
                  className={`px-3 py-2 bg-teal-600 text-white hover:bg-teal-700 rounded text-sm whitespace-nowrap`}
                  onClick={() => setStatusFilter(status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-5">
            <DataTable
              columns={columns}
              data={filteredLeaves}
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
