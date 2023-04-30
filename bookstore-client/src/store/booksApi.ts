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
export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000/books",
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
  tagTypes: ["books"],
  endpoints: (builder) => ({
    getBooks: builder.query<any, void>({
      query: () => `/`,
      providesTags: ["books"],
    }),

    // dont use baseurl
    // set headers null
    getBookOpenLibraryISBN: builder.query<any, any>({
      query: (body) =>
        `https://openlibrary.org/isbn/${body.isbn}.json?&jscmd=data&format=json`,
    }),

    getBook: builder.query<any, any>({
      query: (body) => `/${body.id}`,
    }),

    createBook: builder.mutation<any, any>({
      query: (body) => ({
        url: `/users/${JSON.parse(localStorage.getItem("user")!).id}`,
        method: "POST",
        body,
      }),
    }),

    confirmBook: builder.mutation<any, any>({
      query: (body) => ({
        url: `/${body.id}/users/${
          JSON.parse(localStorage.getItem("user")!).id
        }/confirm`,
        method: "PUT",
      }),
      invalidatesTags: ["books"],
    }),
  }),
});
