import { TablePagination } from "@mui/material";
import { useState } from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { ILeaveList } from "../../interfaces/Leave";
import { useGetLeaveHistoryQuery } from "../../services/apiSlice";
import Loader from "./Loader";

function LeaveList() {
  const authContext = useAuth();
  const { id } = useParams();

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [orderBy, setOrderBy] = useState<string>();
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc");

  const empId =
    authContext?.user?.role === "admin" ? id! : authContext?.user?._id!;
  const { data, isLoading } = useGetLeaveHistoryQuery({
    empId,
    role: authContext?.user?.role!,
    currentPage,
    rowsPerPage,
    status: selectedStatus,
    orderBy,
    orderDirection,
  });

  const handlePageChange = (_: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">
          {authContext?.user?.role === "employee"
            ? "Manage Leaves"
            : "Leave History"}
        </h3>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mt-3 gap-3">
        <select
          className={`w-full sm:w-56 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
          value={selectedStatus}
          onChange={(e) => {
            setSelectedStatus(e.target.value);
            setCurrentPage(0);
          }}
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <div className="w-full sm:w-auto flex justify-center sm:justify-end">
          {authContext?.user?.role === "employee" ? (
            <Link
              to="/employee-dashboard/leave/add"
              className={`w-full sm:w-auto px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded text-white text-center`}
            >
              Add New Leave
            </Link>
          ) : (
            <Link
              to="/admin-dashboard/employees"
              className={`w-full sm:w-auto px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded text-white text-center`}
            >
              Back
            </Link>
          )}
        </div>
      </div>

      {(data?.leaves ?? []).length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 mt-8">
            <thead className="text-lg text-gray-700 bg-gray-50 border border-gray-200 capitalize">
              <tr>
                <th className="px-6 py-3">S No</th>
                {[
                  { key: "leaveType", label: "Leave Type" },
                  { key: "startDate", label: "Start Date" },
                  { key: "endDate", label: "End Date" },
                  { key: "reason", label: "Description" },
                  { key: "appliedAt", label: "Applied Date" },
                  { key: "status", label: "Status" },
                ].map(({ key, label }) => (
                  <th
                    key={key}
                    className="px-6 py-3 cursor-pointer"
                    onClick={() => handleSort(key as keyof ILeaveList)}
                  >
                    <span className="flex items-center gap-1">
                      {label}
                      {orderBy === key ? (
                        orderDirection === "asc" ? (
                          <FaSortUp className="mt-2" size={28} />
                        ) : (
                          <FaSortDown className="mb-2" size={28} />
                        )
                      ) : (
                        <FaSortDown className="opacity-0 mb-2" size={18} />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <>
                {data?.leaves?.map((leave, index) => (
                  <tr
                    key={leave._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-800 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      {currentPage * rowsPerPage + index + 1}
                    </td>
                    <td className="px-6 py-4">{leave.leaveType}</td>
                    <td className="px-6 py-4">
                      {new Date(leave.startDate).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(leave.endDate).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-6 py-4">{leave.reason}</td>
                    <td className="px-6 py-4">
                      {new Date(leave.appliedAt).toLocaleDateString("en-GB")}
                    </td>
                    <td
                      className={`px-6 py-4 font-semibold ${
                        leave.status === "Approved"
                          ? `text-teal-600`
                          : leave.status === "Rejected"
                          ? "text-red-600"
                          : "text-gray-600"
                      }`}
                    >
                      {leave.status}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td
                    colSpan={8}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-800"
                  >
                    <TablePagination
                      component="div"
                      count={data?.totalRecords ?? 0}
                      page={currentPage}
                      onPageChange={handlePageChange}
                      rowsPerPage={rowsPerPage}
                      onRowsPerPageChange={handleRowsPerPageChange}
                      rowsPerPageOptions={[10, 15, 20, 25, 30]}
                    />
                  </td>
                </tr>
              </>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center bg-white py-6 mt-5">
          There are no records to display
        </div>
      )}
    </div>
  );
}

export default LeaveList;
