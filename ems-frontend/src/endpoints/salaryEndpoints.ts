import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/react";
import { IApiResponse } from "../interfaces/Common";
import {
  IEmployeeSalary,
  ISalaryFormValues,
  ISalaryResponse,
  ISalaryStructure,
} from "../interfaces/Salary";

export const salaryEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  getSalaryDetail: builder.query<ISalaryFormValues | null, string>({
    query: (id) => ({ url: `/salary/salary-detail/${id}`, method: "GET" }),
    transformResponse: (response: {
      success: boolean;
      salaryDetail: ISalaryFormValues | null;
    }) => response.salaryDetail,
    providesTags: ["Salary"],
  }),

  addSalary: builder.mutation<IApiResponse, ISalaryFormValues>({
    query: (salaryData) => ({
      url: "/salary/add",
      method: "POST",
      body: salaryData,
    }),
    invalidatesTags: ["Salary", "Employees", "AdminSummary", "EmployeeSummary"],
  }),

  getEmployeeSalaries: builder.query<
    ISalaryResponse,
    {
      id: string;
      role: string;
      currentPage: number;
      rowsPerPage: number;
      orderBy?: keyof IEmployeeSalary;
      orderDirection?: "asc" | "desc";
    }
  >({
    query: ({
      id,
      role,
      currentPage,
      rowsPerPage,
      orderBy,
      orderDirection,
    }) => {
      const params = new URLSearchParams({
        role,
        currentPage: (currentPage + 1).toString(),
        limit: rowsPerPage.toString(),
      });

      if (orderBy) params.append("orderBy", orderBy);
      if (orderDirection) params.append("orderDirection", orderDirection);

      return {
        url: `/salary/${id}?${params.toString()}`,
        method: "GET",
      };
    },
    providesTags: ["Salary"],
    transformResponse: (response: {
      success: boolean;
      salaryResponse: ISalaryResponse;
    }) => response.salaryResponse,
  }),

  downloadSalary: builder.query<{ blob: Blob; filename: string }, string>({
    query: (salaryId) => ({
      url: `/salary/download/${salaryId}`,
      method: "GET",
      responseHandler: async (response: Response) => {
        const blob = await response.blob();
        const contentDisposition = response.headers.get("Content-Disposition");
        const filenameMatch = contentDisposition?.match(/filename="(.+?)"/);
        const filename = filenameMatch
          ? filenameMatch[1]
          : `Salary_${salaryId}.pdf`;

        return { blob, filename };
      },
    }),
  }),

  paySalary: builder.mutation<IApiResponse, string>({
    query: (id) => ({
      url: `/salary/${id}`,
      method: "PUT",
    }),
    invalidatesTags: ["Salary", "EmployeeSummary", "AdminSummary"],
  }),

  getSalaryStructure: builder.query<ISalaryStructure, string>({
    query: (userId) => `/salary/structure/${userId}`,

    transformResponse: (response: {
      success: boolean;
      salaryDetail: ISalaryStructure;
    }) => response.salaryDetail,

    providesTags: ["Salary", "EmployeeSummary"],
  }),
});
