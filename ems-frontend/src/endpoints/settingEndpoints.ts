import { EndpointBuilder } from "@reduxjs/toolkit/dist/query";
import { IApiResponse } from "../interfaces/Common";

export const settingEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  changePassword: builder.mutation<
    IApiResponse,
    {
      userId: string;
      oldPassword: string;
      newPassword: string;
      confirmPassword: string;
    }
  >({
    query: (passwordData) => ({
      url: "/setting/change-password",
      method: "PUT",
      body: passwordData,
    }),
    invalidatesTags: ["Settings"],
  }),
});
