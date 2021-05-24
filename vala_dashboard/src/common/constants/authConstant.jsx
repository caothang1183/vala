export const authConstant = {
  AUTH_LOGIN_SUCCESS: "AUTH/LOGIN_SUCCESS",
  AUTH_LOGIN_FAILED: "AUTH/LOGIN_FAILED",
  AUTH_LOGIN: "AUTH/LOGIN",
  AUTH_FETCH_LOCAL: "AUTH/AUTH_FETCH_LOCAL",
  AUTH_LOGOUT: "AUTH/LOGOUT",
  AUTH_EDIT_USER_SUCCESS: "AUTH/AUTH_EDIT_USER_SUCCESS",
};

export const loginAction = () => {
  return { type: authConstant.AUTH_LOGIN };
};
export const logoutAction = () => {
  return { type: authConstant.AUTH_LOGOUT };
};

export const loginSuccessAction = (token) => {
  return { type: authConstant.AUTH_LOGIN_SUCCESS, payload: token };
};

export const loginFailedAction = (token) => {
  return { type: authConstant.AUTH_LOGIN_FAILED, payload: token };
};

export const fetchLocalAction = (token) => {
  return { type: authConstant.AUTH_FETCH_LOCAL, payload: token };
};

export const editUserNameSuccessAction = (data) => {
  console.log(data);
  return { type: authConstant.AUTH_EDIT_USER_SUCCESS, payload: data };
};
