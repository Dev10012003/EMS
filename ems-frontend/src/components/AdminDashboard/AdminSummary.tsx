import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Loader from "../Common/Loader";
import SummaryCard from "./SummaryCard";
import { useGetAdminSummaryQuery } from "../../services/apiSlice";

function AdminSummary() {
  const { data: summary, error, isLoading } = useGetAdminSummaryQuery();

  if (isLoading) return <Loader />;
  if (error) {
    toast.error("Failed to fetch summary!");
    return <p>Error loading data.</p>;
  }

  return (
    <div className="p-4 md:p-6">
      <h3 className="text-2xl font-bold">Dashboard Overview</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
        <SummaryCard
          icon={<FaUsers />}
          text="Total Employees"
          number={summary?.totalEmployees || 0}
          color="bg-teal-600"
        />
        <SummaryCard
          icon={<FaBuilding />}
          text="Total Departments"
          number={summary?.totalDepartments || 0}
          color="bg-yellow-600"
        />
        <SummaryCard
          icon={<FaMoneyBillWave />}
          text="Monthly Salary"
          number={summary?.totalSalaries || 0}
          isCurrency
          color="bg-red-600"
        />
      </div>
      <div className="mt-10">
        <h4 className="text-2xl font-bold">Leave Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6">
          <SummaryCard
            icon={<FaFileAlt />}
            text="Leave Applied"
            number={summary?.leaveSummary.appliedFor.length || 0}
            color="bg-teal-600"
            details={summary?.leaveSummary.appliedFor}
          />
          <SummaryCard
            icon={<FaCheckCircle />}
            text="Leave Approved"
            number={summary?.leaveSummary.approved.length || 0}
            color="bg-green-600"
            details={summary?.leaveSummary.approved}
          />
          <SummaryCard
            icon={<FaHourglassHalf />}
            text="Leave Pending"
            number={summary?.leaveSummary.pending.length || 0}
            color="bg-yellow-600"
            details={summary?.leaveSummary.pending}
          />
          <SummaryCard
            icon={<FaTimesCircle />}
            text="Leave Rejected"
            number={summary?.leaveSummary.rejected.length || 0}
            color="bg-red-600"
            details={summary?.leaveSummary.rejected}
          />
        </div>
      </div>
      <div className="mt-10">
        <h4 className="text-2xl font-bold">Salary Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6">
          <SummaryCard
            icon={<FaMoneyBillWave />}
            text="Salary Pending"
            number={summary?.salarySummary.length || 0}
            color="bg-teal-600"
            details={summary?.salarySummary}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminSummary;
