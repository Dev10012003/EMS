import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/react";
import {
  IAdminDashboardProps,
  IEmployeeDashboardProps,
} from "../interfaces/Dashboard";

export const dashboardEndpoints = (
  builder: EndpointBuilder<any, any, any>
) => ({
  getAdminSummary: builder.query<IAdminDashboardProps, void>({
    query: () => "dashboard/adminSummary",
    providesTags: ["AdminSummary"],
  }),

  getEmployeeSummary: builder.query<IEmployeeDashboardProps, string>({
    query: (userId) => ({
      url: `/dashboard/employeeSummary/${userId}`,
      method: "GET",
    }),
    providesTags: ["EmployeeSummary"],
    transformResponse: (
      response: { success: boolean } & IEmployeeDashboardProps
    ): IEmployeeDashboardProps => {
      return {
        success: response.success,
        salaryData: response.salaryData.map((item) => ({
          month: item.month,
          netSalary: item.netSalary,
        })),
        leaveData: response.leaveData.map((item) => ({
          leaveType: item.leaveType,
          status: item.status,
          count: item.count,
        })),
      };
    },
  }),
});
