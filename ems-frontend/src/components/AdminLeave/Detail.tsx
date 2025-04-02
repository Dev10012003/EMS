import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DefaultProfile from "../../assets/images/profile.jpg";
import {
  useGetLeaveByIdQuery,
  useUpdateLeaveStatusMutation,
} from "../../services/apiSlice";
import { handleAxiosError } from "../../utils/ErrorHandler";
import Loader from "../Common/Loader";
import { MEDIA_BASE_URL } from "../../utils/Constant";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: leave, isLoading } = useGetLeaveByIdQuery(id!);
  const [updateLeaveStatus] = useUpdateLeaveStatusMutation();

  const changeStatus = async (id: string, status: string) => {
    try {
      const response = await updateLeaveStatus({
        id: id!,
        status,
      }).unwrap();
      if (response.success) {
        toast.success(response.message);
        navigate("/admin-dashboard/leaves");
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <>
      {leave ? (
        <div className="w-full">
          <div className="px-3 sm:px-6 md:px-8 lg:px-12 xl:px-8 py-10 sm:py-12">
            <div className="bg-white p-6 sm:p-8 md:p-10 lg:p-8 rounded-md shadow-lg">
              <div className="flex justify-between items-center">
                <h2 className={`text-2xl font-bold text-teal-600`}>
                  Leave Details
                </h2>
                <button
                  className={`px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded text-white`}
                  onClick={() => navigate("/admin-dashboard/leaves")}
                >
                  Back
                </button>
              </div>
              <hr className={`border-t-2 border-teal-600 my-8`} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex justify-center">
                  <img
                    src={
                      leave.employeeId.userId.profileImage
                        ? `${MEDIA_BASE_URL}/${leave.employeeId.userId.profileImage}`
                        : DefaultProfile
                    }
                    className="w-auto h-96 object-cover border-2"
                  />
                </div>
                <div className="flex justify-center">
                  <div>
                    <div className="flex space-x-3 mb-5">
                      <p className="text-lg font-bold">Name :</p>
                      <p className="text-lg capitalize">
                        {leave.employeeId.userId.name}
                      </p>
                    </div>
                    <div className="flex space-x-3 mb-5">
                      <p className="text-lg font-bold">Employee ID :</p>
                      <p className="text-lg">{leave.employeeId.employeeId}</p>
                    </div>
                    <div className="flex space-x-3 mb-5">
                      <p className="text-lg font-bold">Leave Type :</p>
                      <p className="text-lg">{leave.leaveType}</p>
                    </div>
                    <div className="flex space-x-3 mb-5">
                      <p className="text-lg font-bold">Reason :</p>
                      <p className="text-lg">{leave.reason}</p>
                    </div>
                    <div className="flex space-x-3 mb-5">
                      <p className="text-lg font-bold">Department :</p>
                      <p className="text-lg capitalize">
                        {leave.employeeId.department.dep_name}
                      </p>
                    </div>
                    <div className="flex space-x-3 mb-5">
                      <p className="text-lg font-bold">Start Date :</p>
                      <p className="text-lg">
                        {new Date(leave.startDate).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                    <div className="flex space-x-3 mb-5">
                      <p className="text-lg font-bold">End Date :</p>
                      <p className="text-lg">
                        {new Date(leave.endDate).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                    <div className="flex space-x-3 mb-5 items-center">
                      <p className="text-lg font-bold">
                        {leave.status === "Pending" ? "Action" : "Status"} :
                      </p>
                      {leave.status === "Pending" ? (
                        <div className="flex space-x-3 ">
                          <button
                            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded"
                            onClick={() => changeStatus(leave._id, "Approved")}
                          >
                            Approve
                          </button>

                          <button
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                            onClick={() => changeStatus(leave._id, "Rejected")}
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <p className="text-lg capitalize">{leave.status}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default Detail;
