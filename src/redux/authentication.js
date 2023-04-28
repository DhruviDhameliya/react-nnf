// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";
import secureLocalStorage from "react-secure-storage";

// ** UseJWT import to get config
import useJwt from "@src/auth/jwt/useJwt";

const config = useJwt.jwtConfig;

const initialUser = () => {
  const item = window.localStorage.getItem("userData");
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : {};
};

export const authSlice = createSlice({
  name: "authentication",
  initialState: {
    userData: initialUser(),
  },
  reducers: {
    handleLogin: (state, action) => {
      state.userData = action.payload;
      state[config.storageTokenKeyName] =
        action.payload[config.storageTokenKeyName];
      state[config.storageRefreshTokenKeyName] =
        action.payload[config.storageRefreshTokenKeyName];
      secureLocalStorage.setItem("userData", JSON.stringify(action.payload));
      secureLocalStorage.setItem(
        config.storageTokenKeyName,
        JSON.stringify(action.payload.accessToken)
      );
      secureLocalStorage.setItem(
        config.storageRefreshTokenKeyName,
        JSON.stringify(action.payload.refreshToken)
      );
    },
    handleLogout: (state) => {
      state.userData = {};
      state[config.storageTokenKeyName] = null;
      state[config.storageRefreshTokenKeyName] = null;
      // ** Remove user, accessToken & refreshToken from localStorage
      secureLocalStorage.removeItem("userData");
      secureLocalStorage.removeItem(config.storageTokenKeyName);
      secureLocalStorage.removeItem(config.storageRefreshTokenKeyName);
    },
  },
});

export const { handleLogin, handleLogout } = authSlice.actions;

export default authSlice.reducer;
