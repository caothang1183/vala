import { authConstant } from "./../common/constants/authConstant";

export const authReducer = (state, action) => {
  switch (action.type) {
    case authConstant.AUTH_FETCH_LOCAL: {
      return {
        ...state,
        token: action.payload.token,
        first_name: action.payload.info.first_name,
        last_name: action.payload.info.last_name,
      };
    }
    case authConstant.AUTH_LOGIN: {
      return { ...state, loading: true };
    }
    case authConstant.AUTH_LOGOUT: {
      return { ...state, token: "", first_name: "", last_name: "" };
    }
    case authConstant.AUTH_LOGIN_SUCCESS: {
      let user = JSON.parse(localStorage.getItem("User"));
      return {
        loading: false,
        token: action.payload,
        first_name: user.first_name,
        last_name: user.last_name,
      };
    }
    case authConstant.AUTH_LOGIN_FAILED: {
      return {
        loading: false,
        token: action.payload,
        first_name: "",
        last_name: "",
      };
    }
    case authConstant.AUTH_EDIT_USER_SUCCESS: {
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
      };
    }
    default:
      return { ...state };
  }
};
