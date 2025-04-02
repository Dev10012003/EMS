import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DefaultProfile from "../../assets/images/profile.jpg";
import { useAuth } from "../../context/authContext";
import { IEmployee } from "../../interfaces/Employee";
import { useGetEmployeeByIdQuery } from "../../services/apiSlice";
import { handleAxiosError } from "../../utils/ErrorHandler";
import Loader from "../Common/Loader";
import { MEDIA_BASE_URL } from "../../utils/Constant";

function View() {
  const authContext = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<IEmployee>();
  const role = authContext?.user?.role ?? "admin";
  const { data, error, isLoading } = useGetEmployeeByIdQuery(
    id && role ? { id, role } : { id: "", role: role }
  );
  useEffect(() => {
    if (data) {
      setEmployee(data);
    }
    if (error) {
      handleAxiosError(error);
    }
  }, [data, error]);

  if (isLoading) return <Loader />;

  return (
    <>
      {employee ? (
        <div className="w-full">
          <div className="px-3 sm:px-6 md:px-8 lg:px-12 xl:px-8 py-10 sm:py-12">
            <div className="bg-white p-6 sm:p-8 md:p-10 lg:p-8 rounded-md shadow-lg">
              {authContext?.user?.role === "admin" ? (
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-teal-600">
                    Employee Details
                  </h2>
                  <button
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded text-white"
                    onClick={() => navigate("/admin-dashboard/employees")}
                  >
                    Back
                  </button>
                </div>
              ) : (
                <h2 className="text-2xl font-bold text-center text-teal-600">
                  Employee Details
                </h2>
              )}
              <hr className="border-t-2 border-teal-600 my-8" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex justify-center">
                  <img
                    src={
                      employee.userId.profileImage
                        ? `${MEDIA_BASE_URL}/${employee.userId.profileImage}`
                        : DefaultProfile
                    }
                    className="w-auto h-80 object-cover border-2"
                  />
                </div>
                <div className="flex justify-center">
                  <div>
                    <div className="flex space-x-3 mb-5">
                      <p className="text-lg font-bold">Name :</p>
                      <p className="text-lg capitalize">
                        {employee.userId.name}
                      </p>
                    </div>
                    <div className="flex space-x-3 mb-5">
                      <p className="text-lg font-bold">Employee ID :</p>
                      <p className="text-lg">{employee.employeeId}</p>
                    </div>
                    <div className="flex space-x-3 mb-5">
                      <p className="text-lg font-bold">Date of Birth :</p>
                      <p className="text-lg">
                        {new Date(employee.dob).toDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-3 mb-5">
                      <p className="text-lg font-bold">Gender :</p>
                      <p className="text-lg capitalize">{employee.gender}</p>
                    </div>
                    <div className="flex space-x-3 mb-5">
                      <p className="text-lg font-bold">Department :</p>
                      <p className="text-lg capitalize">
                        {employee.department.dep_name}
                      </p>
                    </div>
                    <div className="flex space-x-3 mb-5">
                      <p className="text-lg font-bold">Designation :</p>
                      <p className="text-lg capitalize">
                        {employee.designation}
                      </p>
                    </div>
                    <div className="flex space-x-3 mb-5">
                      <p className="text-lg font-bold">Marital Status :</p>
                      <p className="text-lg capitalize">
                        {employee.maritalStatus}
                      </p>
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

export default View;
