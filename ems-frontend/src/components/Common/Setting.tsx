import { useFormik } from "formik";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAuth } from "../../context/authContext";
import { IShowPasswordState } from "../../interfaces/Common";
import { useChangePasswordMutation } from "../../services/apiSlice";
import Loader from "./Loader";
import { handleAxiosError } from "../../utils/ErrorHandler";

function Setting() {
  const authContext = useAuth();
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const [showPassword, setShowPassword] = useState<IShowPasswordState>({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field: keyof IShowPasswordState) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const formik = useFormik({
    initialValues: {
      userId: authContext?.user?._id || "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Old Password is required"),
      newPassword: Yup.string().required("New Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const response = await changePassword(values).unwrap();
        if (response.success) {
          toast.success("Password changed successfully");
          authContext?.logout();
        }
      } catch (error: any) {
        handleAxiosError(error);
      }
    },
  });

  return (
    <div className="w-full">
      <div className="px-3 sm:px-6 md:px-8 lg:px-12 xl:px-8 py-10 sm:py-12">
        <div className="bg-white p-6 sm:p-8 md:p-10 lg:p-8 rounded-md shadow-lg">
          <h2 className={`text-2xl font-bold mb-4 text-teal-600`}>
            Change Password
          </h2>
          <hr className={`border-t-2 border-teal-600 my-6`} />

          {isLoading ? (
            <Loader />
          ) : (
            <form onSubmit={formik.handleSubmit}>
              {(
                ["oldPassword", "newPassword", "confirmPassword"] as Array<
                  keyof IShowPasswordState
                >
              ).map((field) => (
                <div className="mb-4" key={field}>
                  <label
                    htmlFor={field}
                    className="common-form-label capitalize"
                  >
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
                className={`w-full mt-7 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-md text-lg`}
                disabled={isLoading}
              >
                {isLoading ? "Changing..." : "Change Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Setting;
