import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/react";
import { IApiResponse } from "../interfaces/Common";
import { IDepartment, IDepartmentResponse } from "../interfaces/Department";

export const departmentEndpoints = (
  builder: EndpointBuilder<any, any, any>
) => ({
  getDepartments: builder.query<IDepartment[], void>({
    query: () => ({
      url: "department",
      method: "GET",
    }),
    transformResponse: (response: { success: boolean; departments: any[] }) =>
      response.success
        ? response.departments.map((dep) => ({
            _id: dep._id,
            dep_name: dep.dep_name,
            action: null,
          }))
        : [],
    providesTags: ["Departments"],
  }),

  addDepartment: builder.mutation<
    IApiResponse,
    { dep_name: string; description: string }
  >({
    query: (newDepartment) => ({
      url: "department",
      method: "POST",
      body: newDepartment,
    }),
    invalidatesTags: ["Departments", "AdminSummary"],
  }),

  getDepartmentById: builder.query<IDepartmentResponse | null, string>({
    query: (id) => `department/${id}`,
    transformResponse: (response: {
      success: boolean;
      department: IDepartmentResponse;
    }) => response.department,
    providesTags: (result, error, id) => [{ type: "Department", id }],
  }),

  updateDepartment: builder.mutation<
    IApiResponse,
    { id: string; data: Partial<IDepartmentResponse> }
  >({
    query: ({ id, data }) => ({
      url: `department/${id}`,
      method: "PUT",
      body: data,
    }),
    invalidatesTags: (result, error, { id }) => [
      { type: "Departments" },
      { type: "Department", id },
    ],
  }),

  deleteDepartment: builder.mutation<IApiResponse, string>({
    query: (id) => ({
      url: `department/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["Departments", "AdminSummary"],
  }),
});
