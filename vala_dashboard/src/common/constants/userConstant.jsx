export const userConstant = {
  USER_FETCH_SUCCESS: "USER/FETCH_SUCCESS",
  USER_FETCH_FAILED: "USER/FETCH_FAILED",
  USER_FETCH_REQUEST: "USER/FETCH_REQUEST",
  USER_UPDATE_ACTIVATED_REQUEST: "USER/UPDATE_ACTIVATED_REQUEST",
  USER_UPDATE_ACTIVATED_SUCCESS: "USER/UPDATE_ACTIVATED_SUCCESS",
  USER_UPDATE_ACTIVATED_FAILED: "USER/UPDATE_ACTIVATED_FAILED",
};

export const actGetListUserRequest = () => {
  return { type: userConstant.USER_FETCH_REQUEST };
};

export const actGetListUserSuccess = (data) => {
  return { type: userConstant.USER_FETCH_SUCCESS, payload: data };
};

export const actGetListUserFailed = () => {
  return { type: userConstant.USER_FETCH_FAILED };
};

export const actUpdateActivatedRequest = () => {
  return { type: userConstant.USER_UPDATE_ACTIVATED_REQUEST };
};

export const actUpdateActivatedSuccess = (id) => {
  return { type: userConstant.USER_UPDATE_ACTIVATED_SUCCESS, payload: id };
};

export const actUpdateActivatedFailed = () => {
  return { type: userConstant.USER_UPDATE_ACTIVATED_FAILED };
};
