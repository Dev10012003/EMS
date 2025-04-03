import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAuth } from "../../context/authContext";
import { ILeaveFormValues } from "../../interfaces/Leave";
import { useAddLeaveMutation } from "../../services/apiSlice";
import { handleAxiosError } from "../../utils/ErrorHandler";
import Loader from "../Common/Loader";

function Add() {
  const authContext = useAuth();
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string>("");
  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0];
  const [addLeave, { isLoading }] = useAddLeaveMutation();

  useEffect(() => {
    if (authContext?.user?._id) {
      setUserId(authContext.user._id);
    }
  }, [authContext]);

  const validationSchema = Yup.object({
    leaveType: Yup.string().required("Leave Type is required"),
    startDate: Yup.date()
      .min(formattedToday, "Start Date cannot be in the past")
      .required("Start Date is required"),
    endDate: Yup.date()
      .min(Yup.ref("startDate"), "End Date must be on or after the Start Date")
      .required("End Date is required"),
    reason: Yup.string().required("Description is required"),
  });

  const initialValues: ILeaveFormValues = {
    userId: userId || "",
    leaveType: "",
    reason: "",
    startDate: "",
    endDate: "",
  };

  const formik = useFormik<ILeaveFormValues>({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const response = await addLeave(values).unwrap();
        if (response.success) {
          navigate("/employee-dashboard/leaves");
          toast.success(response.message);
        }
      } catch (error) {
        handleAxiosError(error);
      }
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full">
      <div className="px-3 sm:px-6 md:px-8 lg:px-12 xl:px-8 py-10 sm:py-12">
        <div className="bg-white p-6 sm:p-8 md:p-10 lg:p-8 rounded-md shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-teal-600">Add Leave</h2>
            <button
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded text-white"
              onClick={() => navigate("/employee-dashboard/leaves")}
            >
              Back
            </button>
          </div>
          <hr className="border-t-2 border-teal-600 my-6" />
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col space-y-4">
              <div>
                <label className="common-form-label">Leave Type</label>
                <select
                  name="leaveType"
                  className="common-form-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.leaveType}
                >
                  <option value="">Select Type Of Leave</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Annual Leave">Annual Leave</option>
                </select>
                {formik.touched.leaveType && formik.errors.leaveType && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.leaveType}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="common-form-label">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    placeholder="Insert Pay Date"
                    className="common-form-input"
                    min={formattedToday}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.startDate}
                  />
                  {formik.touched.startDate && formik.errors.startDate && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.startDate}
                    </p>
                  )}
                </div>
                <div>
                  <label className="common-form-label">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    placeholder="Insert Pay Date"
                    className="common-form-input"
                    min={formik.values.startDate || formattedToday}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.endDate}
                  />
                  {formik.touched.endDate && formik.errors.endDate && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.endDate}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="common-form-label">Description</label>
                <textarea
                  name="reason"
                  placeholder="Insert Reason"
                  className="common-form-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.reason}
                />
                {formik.touched.reason && formik.errors.reason && (
                  <p className="text-red-500 text-sm">{formik.errors.reason}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-7 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-md text-lg"
            >
              Add Leave
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Add;
