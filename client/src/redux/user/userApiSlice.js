// userApiSlice.js
// imports
import { apiSlice } from "../apiSlice";
import { URL_USER } from "../constants";
import { setUser } from "./userSlice";

// other redux hooks

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // userRegister
    userRegister: builder.mutation({
      query: (body) => ({
        url: `${URL_USER}/register`,
        method: "POST",
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setUser(result.data));
        } catch (error) {
          console.error(error);
        }
      },
    }), // end userRegister

    // userLogin
    userLogin: builder.mutation({
      query: (body) => ({
        url: `${URL_USER}/login`,
        method: "POST",
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setUser(result.data));
        } catch (error) {
          console.error(error);
        }
      },
    }), // end userLogin

    // userLogout
    userLogout: builder.mutation({
      query: () => ({
        url: `${URL_USER}/logout`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(apiSlice.util.resetApiState());
          dispatch(setUser({ user: null }));
        } catch (error) {
          console.error(error);
        }
      },
    }), // end userLogout

    // userGet

    // userUpdate
    userUpdate: builder.mutation({
      query: (body) => ({
        url: `${URL_USER}/`,
        method: "PATCH",
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setUser(result.data));
        } catch (error) {
          console.error(error);
        }
      },
    }), // end userUpdate

    // userDelete

    // userGetSession
    userGetSession: builder.query({
      query: () => `${URL_USER}/session`,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setUser(result.data.user ? result.data : { user: null }));
        } catch (error) {
          console.error(error);
        }
      },
    }), // end userGetSession
  }),
});

export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useUserLogoutMutation,
  useUserGetSessionQuery,
  useUserUpdateMutation,
} = userApiSlice;
