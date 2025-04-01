import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL, getToken } from "../utils/Constant";
import { dashboardEndpoints } from "../endpoints/dashboardEndpoints";
import { departmentEndpoints } from "../endpoints/departmentEndpoints";
import { settingEndpoints } from "../endpoints/settingEndpoints";
import { authEndpoints } from "../endpoints/authEndpoints";
import { employeeEndpoints } from "../endpoints/employeeEndpoints";
import { leaveEndpoints } from "../endpoints/leaveEndpoints";
import { salaryEndpoints } from "../endpoints/salaryEndpoints";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Auth",
    "AdminSummary",
    "EmployeeSummary",
    "Departments",
    "Department",
    "Settings",
    "Employees",
    "Leaves",
    "Salary",
  ],
  endpoints: (builder) => ({
    ...authEndpoints(builder),
    ...dashboardEndpoints(builder),
    ...departmentEndpoints(builder),
    ...settingEndpoints(builder),
    ...employeeEndpoints(builder),
    ...leaveEndpoints(builder),
    ...salaryEndpoints(builder),
  }),
});

export const {
  // Dashboard Hooks
  useGetAdminSummaryQuery,
  useGetEmployeeSummaryQuery,

  // Department Hooks
  useGetDepartmentsQuery,
  useAddDepartmentMutation,
  useGetDepartmentByIdQuery,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,

  //Setting Hooks
  useChangePasswordMutation,

  //Auth Hooks
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,

  //Employee Hooks
  useGetEmployeesQuery,
  useAddEmployeeMutation,
  useLazyGetDepartmentByIdQuery,
  useGetEmployeeByIdQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useGetEmployeesByDepartmentQuery,

  //Leave Hooks
  useGetLeavesQuery,
  useGetLeaveByIdQuery,
  useUpdateLeaveStatusMutation,
  useGetLeaveHistoryQuery,
  useAddLeaveMutation,

  //Salary Hooks
  useAddSalaryMutation,
  useGetSalaryDetailQuery,
  useGetEmployeeSalariesQuery,
  usePaySalaryMutation,
  useDownloadSalaryQuery,
  useGetSalaryStructureQuery,
} = apiSlice;

export default apiSlice;
