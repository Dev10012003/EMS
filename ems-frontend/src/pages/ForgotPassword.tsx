import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { handleAxiosError } from "../utils/ErrorHandler";
import { useForgotPasswordMutation } from "../services/apiSlice";
import Loader from "../components/Common/Loader";

function ForgotPassword() {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await forgotPassword(values).unwrap();
        if (response.success) {
          navigate("/login");
          toast.success(response.message);
        }
      } catch (error) {
        handleAxiosError(error);
      }
    },
  });
  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6 px-4 sm:px-6 md:px-8 lg:px-12">
      <h2 className="font-pacific sm:text-3xl text-white text-2xl">
        Employee Management System
      </h2>
      <div className="border shadow-lg p-8 w-full max-w-md bg-white rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-teal-600">
          Forgot Password
        </h2>
        <hr className="border-t-2 border-teal-600 my-3" />
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-8">
            <label htmlFor="email" className="common-form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="common-form-input"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded"
            >
              Send Reset Link
            </button>
          </div>
        </form>

        <Link to="/" className="text-teal-500">
          Back to Login
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
