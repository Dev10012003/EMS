import { BarChart, LineChart } from "@mui/x-charts";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import { useAuth } from "../../context/authContext";
import { useGetEmployeeSummaryQuery } from "../../services/apiSlice";
import { holidayData } from "../../utils/Constant";
import Loader from "../Common/Loader";

function Summary() {
  const authContext = useAuth();
  const userId = authContext?.user?._id || "";

  const { data: summary, isLoading } = useGetEmployeeSummaryQuery(userId);

  if (isLoading) return <Loader />;

  const salaryData = summary?.salaryData || [];
  const leaveData = summary?.leaveData || [];

  const allMonths = Array.from({ length: 12 }, (_, i) =>
    new Date(2000, i, 1).toLocaleString("en-US", { month: "short" })
  );

  const salaryMap = new Map(
    salaryData.map((item) => [item.month, item.netSalary])
  );

  const chartData = allMonths.map((month) => salaryMap.get(month) ?? null);

  const leaveTypes = Array.from(
    new Set(leaveData.map((item) => item.leaveType))
  );
  const statuses = Array.from(new Set(leaveData.map((item) => item.status)));

  return (
    <div className="p-6">
      <div className="rounded flex bg-white mb-5">
        <div
          className={
            "text-4xl flex items-center justify-center text-white px-5 bg-teal-600"
          }
        >
          <FaUser />
        </div>
        <div className="pl-6 py-3">
          <p className="text-xl font-semibold">Welcome Back</p>
          <p className="text-2xl font-bold">{authContext?.user?.name}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Salary Trend</h3>
          {salaryData.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">
              No salary records available
            </p>
          ) : (
            <LineChart
              height={300}
              margin={{ left: 55 }}
              xAxis={[
                {
                  scaleType: "point",
                  data: allMonths,
                },
              ]}
              yAxis={[
                {
                  min: 0,
                  max: 110000,
                },
              ]}
              series={[
                {
                  data: chartData,
                  label: `Salary (${new Date().getFullYear()})`,
                  color: "teal",
                  showMark: true,
                },
              ]}
            />
          )}
        </div>
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Leave Distribution</h3>
          {leaveData.every((item) => item.count === 0) ? (
            <p className="text-gray-500 text-center mt-10">
              No leave records available
            </p>
          ) : (
            <BarChart
              height={300}
              xAxis={[
                { scaleType: "band", data: leaveTypes, label: "Leave Type" },
              ]}
              yAxis={[
                {
                  min: 0,
                  max: 5,
                  label: "No. of Leaves",
                },
              ]}
              series={statuses.map((status) => ({
                data: leaveTypes.map(
                  (leaveType) =>
                    leaveData.find(
                      (item) =>
                        item.leaveType === leaveType && item.status === status
                    )?.count || 0
                ),
                label: status,
                color:
                  status === "Approved"
                    ? "teal"
                    : status === "Pending"
                    ? "orange"
                    : status === "Rejected"
                    ? "red"
                    : "gray",
              }))}
            />
          )}
        </div>
      </div>
      <div className="bg-white p-6 sm:p-8 md:p-10 lg:p-8 rounded-md shadow-lg">
        <h2 className="text-2xl font-bold text-teal-600">Holiday List</h2>
        <p className="text-gray-500 mt-2">Upcoming holidays for 2025</p>
        <hr className="border-t-2 border-teal-600 my-6" />
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-teal-500 text-white">
              <tr>
                <th className="p-4">Holiday</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {holidayData.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 flex items-center">
                    <FaCalendarAlt className="text-teal-500 mr-2" />
                    {item.label}
                  </td>
                  <td className="p-4 font-medium">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-600">* All dates are for the year 2025</p>
        </div>
      </div>
    </div>
  );
}

export default Summary;
