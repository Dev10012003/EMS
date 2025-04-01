import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { IEditEmployeeFormValues } from "../../interfaces/Employee";
import {
  useGetDepartmentsQuery,
  useGetEmployeeByIdQuery,
  useUpdateEmployeeMutation,
} from "../../services/apiSlice";
import { handleAxiosError } from "../../utils/ErrorHandler";
import Loader from "../Common/Loader";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: departments, isLoading } = useGetDepartmentsQuery();

  const [updateEmployee] = useUpdateEmployeeMutation();

  const { data, isSuccess } = useGetEmployeeByIdQuery({
    id: id!,
    role: "admin",
  });

  useEffect(() => {
    if (isSuccess && data) {
      const employeeDetail = data;
      const formattedDob = employeeDetail.dob
        ? new Date(employeeDetail.dob).toISOString().split("T")[0]
        : "";

      formik.setFieldValue("name", employeeDetail.userId.name);
      formik.setFieldValue("maritalStatus", employeeDetail.maritalStatus);
      formik.setFieldValue("salary", employeeDetail.salary);
      formik.setFieldValue("department", employeeDetail.department._id);
      formik.setFieldValue("designation", employeeDetail.designation);
      formik.setFieldValue("gender", employeeDetail.gender);
      formik.setFieldValue("role", employeeDetail.userId.role);
      formik.setFieldValue("dob", formattedDob);
      formik.setFieldValue("image", employeeDetail.userId.profileImage);
    }
  }, [isSuccess, data]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    maritalStatus: Yup.string().required("Marital status is required"),
    designation: Yup.string().required("Designation is required"),
    department: Yup.string().required("Department is required"),
    salary: Yup.number()
      .typeError("Salary must be a number")
      .required("Salary is required"),
    dob: Yup.string().required("Date of birth is required"),
    gender: Yup.string().required("Gender is required"),
    role: Yup.string().required("Role is required"),
  });

  const initialValues: IEditEmployeeFormValues = {
    name: "",
    maritalStatus: "",
    designation: "",
    department: "",
    role: "",
    dob: "",
    gender: "",
    image: "",
  };

  const formik = useFormik<IEditEmployeeFormValues>({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(
              key,
              value instanceof File ? value : value.toString()
            );
          }
        });
        const response = await updateEmployee({
          id: id!,
          formData,
        }).unwrap();

        if (response.success) {
          navigate("/admin-dashboard/employees");
          toast.success(response.message);
        }
      } catch (error) {
        handleAxiosError(error);
      }
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="w-full">
      <div className="px-3 sm:px-6 md:px-8 lg:px-12 xl:px-8 py-10 sm:py-12">
        <div className="bg-white p-6 sm:p-8 md:p-10 lg:p-8 rounded-md shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-teal-600">Edit Employee</h2>
            <button
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded text-white"
              onClick={() => navigate("/admin-dashboard/employees")}
            >
              Back
            </button>
          </div>
          <hr className="border-t-2 border-teal-600 my-6" />
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="common-form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Insert Name"
                  className="common-form-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-sm">{formik.errors.name}</p>
                )}
              </div>
              <div>
                <label className="common-form-label">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  placeholder="DOB"
                  className="common-form-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dob}
                />
                {formik.touched.dob && formik.errors.dob && (
                  <p className="text-red-500 text-sm">{formik.errors.dob}</p>
                )}
              </div>
              <div>
                <label className="common-form-label">Gender</label>
                <select
                  name="gender"
                  className="common-form-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.gender}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {formik.touched.gender && formik.errors.gender && (
                  <p className="text-red-500 text-sm">{formik.errors.gender}</p>
                )}
              </div>
              <div>
                <label className="common-form-label">Marital Status</label>
                <select
                  name="maritalStatus"
                  className="common-form-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.maritalStatus}
                >
                  <option value="">Select Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                </select>
                {formik.touched.maritalStatus &&
                  formik.errors.maritalStatus && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.maritalStatus}
                    </p>
                  )}
              </div>
              <div>
                <label className="common-form-label">Designation</label>
                <input
                  type="text"
                  name="designation"
                  placeholder="Insert Designation"
                  className="common-form-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.designation}
                />
                {formik.touched.designation && formik.errors.designation && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.designation}
                  </p>
                )}
              </div>
              <div>
                <label className="common-form-label">Department</label>
                <select
                  name="department"
                  className="common-form-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.department}
                >
                  <option value="" disabled>
                    Select Department
                  </option>
                  {departments ? (
                    departments.map((dep) => (
                      <option key={dep._id} value={dep._id}>
                        {dep.dep_name}
                      </option>
                    ))
                  ) : (
                    <option>No Departments Available</option>
                  )}
                </select>
                {formik.touched.department && formik.errors.department && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.department}
                  </p>
                )}
              </div>
              <div>
                <label className="common-form-label">Role</label>
                <select
                  name="role"
                  className="common-form-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.role}
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                </select>
                {formik.touched.role && formik.errors.role && (
                  <p className="text-red-500 text-sm">{formik.errors.role}</p>
                )}
              </div>
              <div>
                <label className="common-form-label">
                  {formik.values.image ? "Upload New Image" : "Upload Image"}
                </label>
                <input
                  type="file"
                  name="image"
                  placeholder="Upload Image"
                  accept="image/*"
                  className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500;"
                  onChange={(event) => {
                    formik.setFieldValue(
                      "image",
                      event.currentTarget.files?.[0] || null
                    );
                  }}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-7 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-md text-lg"
            >
              Edit Employee
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Edit;
