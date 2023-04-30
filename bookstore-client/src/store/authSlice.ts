import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import { JwtDto } from "@/context/AuthContext";

export interface AuthState {
  jwt: JwtDto | null;
  user?: any;
}

const initialState: AuthState = {
  jwt: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserNull: (state) => {
      state.user = null;
    },

    setJwtNull: (state) => {
      localStorage.removeItem("token");
      state.jwt = null;
    },

    logoutUser: (state) => {
      state.user = null;
      state.jwt = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        if (action.payload) {
          state.jwt = {
            accessToken: action.payload.accessToken,
            refreshToken: action.payload.refreshToken,
            user: action.payload.user,
          };
          localStorage.setItem("accessToken", action.payload.accessToken);
          localStorage.setItem("refreshToken", action.payload.refreshToken);
        }
      }
    );

    builder.addMatcher(authApi.endpoints.me.matchFulfilled, (state, action) => {
      if (action.payload) {
        state.jwt = {
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
          user: action.payload.user,
        };
        // localStorage.setItem("accessToken", action.payload.accessToken);
        // localStorage.setItem("refreshToken", action.payload.refreshToken);
      }
    });

    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, action) => {
        if (action.payload) {
          state.jwt = {
            accessToken: action.payload.accessToken,
            refreshToken: action.payload.refreshToken,
            user: action.payload.user,
          };
          localStorage.setItem("accessToken", action.payload.accessToken);
          localStorage.setItem("refreshToken", action.payload.refreshToken);
        }
      }
    );
  },
});

export const { setUserNull, setJwtNull } = authSlice.actions;
