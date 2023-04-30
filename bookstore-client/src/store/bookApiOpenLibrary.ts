import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const booksApiOpenLibrary = createApi({
  reducerPath: "booksApiOpenLibrary",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://openlibrary.org",
  }),
  endpoints: (builder) => ({
    // dont use baseurl
    // set headers null
    getBookOpenLibraryISBN: builder.query<any, any>({
      query: (body) => `/isbn/${body.isbn}.json?&jscmd=data&format=json`,
    }),
  }),
});
