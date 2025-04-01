import { useFormik } from "formik";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Loader from "../components/Common/Loader";
import { useResetPasswordMutation } from "../services/apiSlice";
import { handleAxiosError } from "../utils/ErrorHandler";

function ResetPassword() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (
    field: "newPassword" | "confirmPassword"
  ) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await resetPassword({
          token: token ?? "",
          newPassword: values.newPassword,
        }).unwrap();
        if (response.success) {
          navigate("/");
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
          Reset Password
        </h2>
        <hr className="border-t-2 border-teal-600 my-3" />
        <form onSubmit={formik.handleSubmit}>
          {(["newPassword", "confirmPassword"] as const).map((field) => (
            <div className="mb-4" key={field}>
              <label htmlFor={field} className="common-form-label capitalize">
                {field.replace("Password", " Password")}
              </label>
              <div className="relative">
                <input
                  type={showPassword[field] ? "text" : "password"}
                  name={field}
                  placeholder={`Enter ${field.replace(
                    "Password",
                    " Password"
                  )}`}
                  className="common-form-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[field]}
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={() => togglePasswordVisibility(field)}
                >
                  {showPassword[field] ? (
                    <FaEye size={20} color="gray" />
                  ) : (
                    <FaEyeSlash size={20} color="gray" />
                  )}
                </span>
              </div>
              {formik.touched[field] && formik.errors[field] && (
                <div className="text-red-600 text-sm mt-1">
                  {formik.errors[field]}
                </div>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 mt-3 rounded"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
