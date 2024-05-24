import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL_BASE } from "./constants.js";

// fetch base query
const baseQuery = fetchBaseQuery({
  baseUrl: URL_BASE,
  credentials: "include",
});

// create api
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
