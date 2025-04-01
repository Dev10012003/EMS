import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAuth } from "../context/authContext";
import { IUserInfo } from "../interfaces/Common";
import { handleAxiosError } from "../utils/ErrorHandler";
import { useLoginMutation } from "../services/apiSlice";
import Loader from "../components/Common/Loader";

function Login() {
  const navigate = useNavigate();
  const authContext = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const userData =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    if (userData) {
      const user: IUserInfo = JSON.parse(userData);
      navigate(`/${user.role}-dashboard`);
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await login(values).unwrap();
        if (response.success) {
          const data = response.loginResponse;
          authContext?.login(data.user, values.rememberMe);
          values.rememberMe
            ? localStorage.setItem("token", data.token)
            : sessionStorage.setItem("token", data.token);
          if (data.user.role === "admin") {
            navigate("/admin-dashboard");
          } else {
            navigate("/employee-dashboard");
          }
          toast.success("Login Successfully.");
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
        <h2 className="text-2xl font-bold mb-4 text-teal-600">Login</h2>

        <hr className="border-t-2 border-teal-600 my-3" />
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="common-form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
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
          <div className="mb-4 relative">
            <label htmlFor="password" className="common-form-label">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                className="common-form-input"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center"
              >
                {showPassword ? (
                  <FaEye size={20} color="gray" />
                ) : (
                  <FaEyeSlash size={20} color="gray" />
                )}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>

          <div className="mb-6 flex items-center justify-between">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                className="form-checkbox accent-teal-600 w-4 h-4"
                onChange={formik.handleChange}
                checked={formik.values.rememberMe}
              />
              <span className="ml-2 text-gray-700">Remember Me</span>
            </label>
            <a href="/forgot-password" className="text-teal-500">
              Forgot Password?
            </a>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
