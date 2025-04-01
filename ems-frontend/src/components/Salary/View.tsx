import TablePagination from "@mui/material/TablePagination";
import { useEffect, useState } from "react";
import { FaDownload, FaSortDown, FaSortUp } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authContext";
import { IEmployeeSalary } from "../../interfaces/Salary";
import {
  useDownloadSalaryQuery,
  useGetEmployeeSalariesQuery,
  usePaySalaryMutation,
} from "../../services/apiSlice";

function View() {
  const navigate = useNavigate();
  const authContext = useAuth();
  const { id } = useParams();
  const role = authContext?.user?.role;

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState<keyof IEmployeeSalary>();
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc");

  const { data, refetch } = useGetEmployeeSalariesQuery({
    id: id || "",
    role: role || "",
    currentPage,
    rowsPerPage,
    orderBy,
    orderDirection,
  });

  const [paySalary] = usePaySalaryMutation();

  const [salaryIdToDownload, setSalaryIdToDownload] = useState<string | null>(
    null
  );

  const { data: downloadData } = useDownloadSalaryQuery(salaryIdToDownload!, {
    skip: !salaryIdToDownload,
  });

  useEffect(() => {
    if (downloadData && salaryIdToDownload) {
      const { blob, filename } = downloadData;

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setSalaryIdToDownload(null);
    }
  }, [downloadData, salaryIdToDownload]);

  const handleDownloadSalary = (salaryId: string) => {
    setSalaryIdToDownload(salaryId);
  };

  const handlePaySalary = async (salaryId: string) => {
    try {
      await paySalary(salaryId).unwrap();
      toast.success("Salary paid successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to pay salary");
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handleSort = (property: keyof IEmployeeSalary) => {
    const isAsc = orderBy === property && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <div className="p-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Salary History</h2>
      </div>
      {authContext?.user?.role === "admin" && (
        <div className="flex justify-end mt-3">
          <button
            className="px-4 py-2 bg-teal-500 hover:bg-teal-700 rounded text-white"
            onClick={() => navigate("/admin-dashboard/employees")}
          >
            Back
          </button>
        </div>
      )}
      {(data?.employeeSalaries ?? []).length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 mt-8">
            <thead className="text-lg text-gray-700 bg-gray-50 border border-gray-200 capitalize">
              <tr>
                <th className="px-6 py-3">S No</th>
                <th className="px-6 py-3">Month</th>
                <th className="px-6 py-3">Emp Id</th>
                {[
                  { key: "basicSalary", label: "Basic Salary" },
                  { key: "allowances", label: "Allowance" },
                  { key: "deductions", label: "Deduction" },
                  { key: "leaveDays", label: "Leaves" },
                  { key: "paidLeavesUsed", label: "Paid Leaves" },
                  { key: "carryForwardLeaves", label: "Remaining Paid Leaves" },
                  { key: "leaveDeduction", label: "Leave Deduction" },
                  { key: "netSalary", label: "Total" },
                  { key: "payDate", label: "Pay Date" },
                ].map(({ key, label }) => (
                  <th
                    key={key}
                    className="px-6 py-3 cursor-pointer"
                    onClick={() => handleSort(key as keyof IEmployeeSalary)}
                  >
                    <span className="flex items-center  gap-1">
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
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              <>
                {data?.employeeSalaries.map((salary, index) => (
                  <tr
                    key={salary._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-800 hover:bg-gray-50"
                  >
                    <td className="px-6 py-5">
                      {currentPage * rowsPerPage + index + 1}
                    </td>
                    <td className="px-6 py-5">
                      {new Date(
                        new Date(salary.payDate).setMonth(
                          new Date(salary.payDate).getMonth() - 1
                        )
                      ).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "long",
                      })}
                    </td>
                    <td className="px-6 py-5">{salary.employeeId}</td>
                    <td className="px-6 py-5">{salary.basicSalary}</td>
                    <td className="px-6 py-5">{salary.allowances}</td>
                    <td className="px-6 py-5">{salary.deductions}</td>
                    <td className="px-6 py-5">{salary.leaveDays}</td>
                    <td className="px-6 py-5">{salary.paidLeavesUsed}</td>
                    <td className="px-6 py-5">{salary.carryForwardLeaves}</td>
                    <td className="px-6 py-5">{salary.leaveDeduction}</td>
                    <td className="px-6 py-5">{salary.netSalary}</td>
                    <td className="px-6 py-5">
                      {new Date(salary.payDate).toLocaleDateString("en-GB")}
                    </td>
                    {role !== "admin" ? (
                      <td className="px-9 py-5">
                        <FaDownload
                          size={20}
                          color="teal"
                          cursor="pointer"
                          onClick={() => handleDownloadSalary(salary._id)}
                        />
                      </td>
                    ) : (
                      <td className="px-6 py-5">
                        {salary.status !== "Paid" ? (
                          <button
                            className="px-4 py-2 bg-teal-500 hover:bg-teal-700 text-white rounded"
                            onClick={() => handlePaySalary(salary._id)}
                          >
                            Pay
                          </button>
                        ) : (
                          "Paid"
                        )}
                      </td>
                    )}
                  </tr>
                ))}
                <tr>
                  <td
                    colSpan={13}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-800"
                  >
                    <TablePagination
                      component="div"
                      count={data?.totalRecords || 0}
                      page={currentPage}
                      onPageChange={handleChangePage}
                      rowsPerPage={rowsPerPage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
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

export default View;
