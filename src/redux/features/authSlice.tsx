import { createSlice } from "@reduxjs/toolkit";

export interface UserProps {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
  gender: string;
  location: string;
}

interface AuthProps {
  loginStatus: boolean;
  user: UserProps;
}

const initialState: AuthProps = {
  loginStatus: false,
  user: {
    _id: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: new Date(),
    gender: "",
    location: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const newState = {
        ...state,
        user: { ...state.user, ...action.payload },
      };
      return newState;
    },
    setLoginStatus: (state, action) => {
      const newState = {
        ...state,
        loginStatus: action.payload,
      };
      return newState;
    },
    logout: (state) => {
      return initialState;
    },
  },
});

export const { updateUser, setLoginStatus, logout } = authSlice.actions;
export default authSlice.reducer;
