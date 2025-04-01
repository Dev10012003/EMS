import { FaRupeeSign } from "react-icons/fa";
import { useAuth } from "../../context/authContext";
import { useGetSalaryStructureQuery } from "../../services/apiSlice";
import Loader from "../Common/Loader";

function Structure() {
  const authContext = useAuth();
  const userId = authContext?.user?._id;

  const { data: salaryDetail, isLoading } = useGetSalaryStructureQuery(
    userId!,
    {
      skip: !userId,
    }
  );

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="w-full">
      <div className="px-3 sm:px-6 md:px-8 lg:px-12 xl:px-8 py-10 sm:py-12">
        <div className="bg-white p-6 sm:p-8 md:p-10 lg:p-8 rounded-md shadow-lg">
          <h2 className="text-2xl font-bold text-teal-600">Salary Structure</h2>
          <p className="text-gray-500 mt-2">
            Detailed breakdown of salary components
          </p>
          <hr className="border-t-2 border-teal-600 my-6" />
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-teal-500 text-white">
                <tr>
                  <th className="p-4">Component</th>
                  <th className="p-4">Amount</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {[
                  {
                    label: "Basic Salary",
                    amount: `+${(salaryDetail?.basicSalary ?? 0).toFixed(2)}`,
                  },
                  {
                    label: "House Rent Allowance",
                    amount: `+${((salaryDetail?.allowances ?? 0) * 0.5).toFixed(
                      2
                    )}`,
                  },
                  {
                    label: "Medical Allowance",
                    amount: `+${((salaryDetail?.allowances ?? 0) * 0.4).toFixed(
                      2
                    )}`,
                  },
                  {
                    label: "Other Allowances",
                    amount: `+${((salaryDetail?.allowances ?? 0) * 0.1).toFixed(
                      2
                    )}`,
                  },
                  {
                    label: "Reserve Gratuity",
                    amount: `-${((salaryDetail?.deductions ?? 0) * 0.4).toFixed(
                      2
                    )}`,
                  },
                  {
                    label: "Professional Tax",
                    amount: "-200.00",
                  },
                  {
                    label: "Other Deductions",
                    amount: `-${((salaryDetail?.deductions ?? 0) * 0.6).toFixed(
                      2
                    )}`,
                  },
                ].map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 flex items-center">
                      <FaRupeeSign className="text-teal-500 mr-2" />
                      {item.label}
                    </td>
                    <td className="p-4 font-medium">{item.amount}</td>
                  </tr>
                ))}
                <tr className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-4 flex items-center">
                    <FaRupeeSign className="text-teal-500 mr-2" />
                    Net Salary
                  </td>
                  <td className="p-4 font-bold">
                    {(salaryDetail?.netSalary ?? 0).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-600">* All amounts are in INR</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Structure;
