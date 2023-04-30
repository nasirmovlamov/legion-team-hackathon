import { JwtDto, UserDto } from "@/context/AuthContext";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type PokemonType = {
  name: string;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type RegisterDto = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
    // global error message toaster
    // ref: https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#global-error-handling
    prepareHeaders: (headers, { getState }) => {
      const accessToken = localStorage.getItem("accessToken");
      console.log("accessToken", accessToken);
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["me"],
  endpoints: (builder) => ({
    me: builder.query<any, void>({
      query: () => `/users/me`,
    }),

    refreshToken: builder.mutation<
      JwtDto,
      {
        accessToken: string;
        refreshToken: string;
      }
    >({
      query: (body) => ({
        url: `/auth/token/refresh`,
        method: "POST",
        body,
      }),
    }),

    requestPasswordReset: builder.mutation<
      any,
      {
        email: string;
      }
    >({
      query: (body) => ({
        url: `/auth/password/reset-request`,
        method: "POST",
        body,
      }),
    }),

    forgetPassword: builder.mutation<
      any,
      {
        email: string;
        token: string;
        password: string;
        passwordConfirm: string;
      }
    >({
      query: (body) => ({
        url: `/auth/password/reset`,
        method: "POST",
        body,
      }),
    }),

    //use params
    emailConfirmation: builder.mutation<
      any,
      {
        token: string;
        email: string;
      }
    >({
      query: (body) => ({
        url: `/auth/email?token=${body.token}&email=${body.email}`,
        method: "GET",
      }),
    }),

    login: builder.mutation<JwtDto, LoginDto>({
      query: (body) => ({
        url: `/auth/login`,
        method: "POST",
        body,
      }),
    }),

    register: builder.mutation<any, any>({
      query: (body) => ({
        url: `/auth/register`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "me", id: "LIST" }],
    }),
  }),
});
