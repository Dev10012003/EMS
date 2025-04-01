import { EndpointBuilder } from "@reduxjs/toolkit/query";
import {
  ILeave,
  ILeaveData,
  ILeaveFormValues,
  ILeaveList,
  ILeaveResponse,
} from "../interfaces/Leave";
import { IApiResponse } from "../interfaces/Common";

export const leaveEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  getLeaves: builder.query<ILeaveData[], void>({
    query: () => ({
      url: "/leave",
      method: "GET",
    }),
    providesTags: ["Leaves"],
    transformResponse: (response: { success: boolean; leaves: any[] }) =>
      response.success
        ? response.leaves.map((leave) => ({
            _id: leave._id,
            employeeId: leave.employeeId,
            name: leave.name,
            leaveType: leave.leaveType,
            dep_name: leave.dep_name,
            status: leave.status,
            days: leave.days,
            action: null,
          }))
        : [],
  }),

  getLeaveById: builder.query<ILeave, string>({
    query: (id) => ({
      url: `/leave/detail/${id}`,
      method: "GET",
    }),
    providesTags: (result, error, id) => [{ type: "Leaves", id }],
    transformResponse: (response: { success: boolean; leave: any }) =>
      response.success ? response.leave : null,
  }),

  addLeave: builder.mutation<IApiResponse, ILeaveFormValues>({
    query: (leaveData) => ({
      url: `/leave/add`,
      method: "POST",
      body: leaveData,
    }),
    invalidatesTags: ["Leaves", "AdminSummary", "EmployeeSummary"],
  }),

  updateLeaveStatus: builder.mutation<
    IApiResponse,
    { id: string; status: string }
  >({
    query: ({ id, status }) => ({
      url: `/leave/${id}`,
      method: "PUT",
      body: { status },
    }),
    invalidatesTags: (result, error, { id }) => [
      { type: "Leaves" },
      { type: "Leaves", id },
      { type: "AdminSummary" },
      { type: "EmployeeSummary" },
    ],
  }),

  getLeaveHistory: builder.query<
    ILeaveResponse,
    {
      empId: string;
      role: string;
      currentPage: number;
      rowsPerPage: number;
      status: string;
      orderBy?: string;
      orderDirection?: "asc" | "desc";
    }
  >({
    query: ({
      empId,
      role,
      currentPage,
      rowsPerPage,
      status,
      orderBy,
      orderDirection,
    }) => ({
      url: `/leave/${empId}`,
      method: "GET",
      params: {
        role,
        currentPage: currentPage + 1,
        limit: rowsPerPage,
        status,
        orderBy,
        orderDirection,
      },
    }),
    providesTags: ["Leaves"],
    transformResponse: (response: { success: boolean; leaveResponse: any }) => {
      if (response.success) {
        return {
          leaves: response.leaveResponse.leaves.map((leave: ILeaveList) => ({
            ...leave,
            startDate: new Date(leave.startDate).toISOString(),
            endDate: new Date(leave.endDate).toISOString(),
            appliedAt: new Date(leave.appliedAt).toISOString(),
          })),
          totalRecords: response.leaveResponse.totalRecords,
        };
      }
      return { leaves: [], totalRecords: 0 };
    },
  }),
});
