import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/react";
import { ILoginResponse, IApiResponse } from "../interfaces/Common";

export const authEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  login: builder.mutation<ILoginResponse, { email: string; password: string }>({
    query: (values) => ({
      url: "auth/login",
      method: "POST",
      body: values,
    }),
    invalidatesTags: ["Auth"],
  }),

  forgotPassword: builder.mutation<IApiResponse, { email: string }>({
    query: (values) => ({
      url: "auth/forgot-password",
      method: "POST",
      body: values,
    }),
    invalidatesTags: ["Auth"],
  }),
  resetPassword: builder.mutation<
    IApiResponse,
    { token: string; newPassword: string }
  >({
    query: ({ token, newPassword }) => ({
      url: `auth/reset-password/${token}`,
      method: "POST",
      body: { newPassword },
    }),
    invalidatesTags: ["Auth"],
  }),
});
