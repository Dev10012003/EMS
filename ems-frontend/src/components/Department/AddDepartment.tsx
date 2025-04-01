import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { handleAxiosError } from "../../utils/ErrorHandler";
import Loader from "../Common/Loader";
import { useAddDepartmentMutation } from "../../services/apiSlice";

function AddDepartment() {
  const navigate = useNavigate();
  const [addDepartment, { isLoading }] = useAddDepartmentMutation();
  const formik = useFormik({
    initialValues: {
      dep_name: "",
      description: "",
    },
    validationSchema: Yup.object({
      dep_name: Yup.string().required("Department Name is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await addDepartment(values).unwrap();
        if (response.success) {
          navigate("/admin-dashboard/departments");
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
            <h3 className={`text-2xl font-bold text-teal-600`}>
              Add Department
            </h3>
            <button
              className={`px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded text-white`}
              onClick={() => navigate("/admin-dashboard/departments")}
            >
              Back
            </button>
          </div>
          <hr className={`border-t-2 border-teal-600 my-6`} />
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="dep_name" className="common-form-label">
                Department Name
              </label>
              <input
                type="text"
                id="dep_name"
                name="dep_name"
                placeholder="Enter Dep Name"
                className="common-form-input"
                value={formik.values.dep_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.dep_name && formik.errors.dep_name && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.dep_name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="description" className="common-form-label mt-3">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Description"
                className={`mt-2 w-full p-3 block border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
                rows={6}
                value={formik.values.description}
                onChange={formik.handleChange}
              />
            </div>
            <button
              type="submit"
              className={`w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded text-lg`}
            >
              Add Department
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddDepartment;
