import axios from "axios";
import {
  GET_USER_PROFILE_FAILURE,
  GET_USER_PROFILE_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
} from "./ActionType";
import { API_BASE_URL } from "../../config/api";

// ✅ LOGIN USER
export const loginUser = (loginData) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData);
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }
    dispatch({ type: LOGIN_USER_SUCCESS, payload: data.jwt });
  } catch (error) {
    console.log("Login error:", error);
    dispatch({ type: LOGIN_USER_FAILURE, payload: error.message });
  }
};

// ✅ REGISTER USER
export const registerUser = (registerData) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, registerData);
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.jwt });
  } catch (error) {
    console.log("Register error:", error);
    dispatch({ type: REGISTER_USER_FAILURE, payload: error.message });
  }
};

// ✅ GET USER PROFILE
export const getUserProfile = (jwt) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.log("Profile fetch error:", error);
    dispatch({ type: GET_USER_PROFILE_FAILURE, payload: error.message });
  }
};

// ✅ LOGIN WITH GOOGLE
export const loginWithGoogle = (googleToken) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/google`, {
      token: googleToken,
    });

    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }

    dispatch({ type: LOGIN_USER_SUCCESS, payload: data.jwt });
  } catch (error) {
    console.log("Google login error:", error);
    dispatch({ type: LOGIN_USER_FAILURE, payload: error.message });
  }
};
