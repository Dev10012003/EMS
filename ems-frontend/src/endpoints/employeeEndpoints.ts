import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { IApiResponse } from "../interfaces/Common";
import { IEmployee, IEmployeeTableData } from "../interfaces/Employee";
import { MEDIA_BASE_URL } from "../utils/Constant";

export const employeeEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  getEmployees: builder.query<IEmployeeTableData[], void>({
    query: () => ({
      url: "/employee",
      method: "GET",
    }),
    providesTags: ["Employees"],
    transformResponse: (response: { success: boolean; employees: any[] }) =>
      response.success
        ? response.employees.map((emp) => ({
            _id: emp._id,
            name: emp.userId.name,
            dob: new Date(emp.dob).toDateString(),
            profileImage: emp.userId.profileImage
              ? `${MEDIA_BASE_URL}/${emp.userId.profileImage}`
              : "/assets/images/profile.jpg",
            dep_name: emp.department.dep_name,
            action: null,
          }))
        : [],
  }),

  getEmployeeById: builder.query<IEmployee, { id: string; role: string }>({
    query: ({ id, role }) => ({
      url: `/employee/${id}`,
      method: "GET",
      params: { role },
    }),
    providesTags: (result, error, { id }) => [{ type: "Employee", id }],
    transformResponse: (response: { success: boolean; employee: any }) =>
      response.success ? response.employee : null,
  }),

  getEmployeesByDepartment: builder.query<IEmployee[], string>({
    query: (id) => ({
      url: `/employee/department/${id}`,
      method: "GET",
    }),
    transformResponse: (response: {
      success: boolean;
      employees: IEmployee[];
    }) => response.employees,
    providesTags: ["Employees"],
  }),

  addEmployee: builder.mutation<IApiResponse, FormData>({
    query: (formData) => ({
      url: "/employee/add",
      method: "POST",
      body: formData,
    }),
    invalidatesTags: ["Employees", "AdminSummary", "Departments"],
  }),

  updateEmployee: builder.mutation<
    IApiResponse,
    { id: string; formData: FormData }
  >({
    query: ({ id, formData }) => ({
      url: `/employee/${id}`,
      method: "PUT",
      body: formData,
    }),
    invalidatesTags: (result, error, { id }) => [
      { type: "Employees" },
      { type: "Departments" },
      { type: "AdminSummary" },
      { type: "EmployeeSummary" },
      { type: "Employee", id },
    ],
  }),

  deleteEmployee: builder.mutation<IApiResponse, string>({
    query: (id) => ({
      url: `employee/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["Employees", "AdminSummary"],
  }),
});
