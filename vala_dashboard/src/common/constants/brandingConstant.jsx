export const brandingConstant = {
  BRANDING_FETCH_SUCCESS: "BRANDING/LOGIN_SUCCESS",
  BRANDING_FETCH_FAILED: "BRANDING/LOGIN_FAILED",
  BRANDING_FETCH: "BRANDING/LOGIN",
  BRANDING_ADD: "BRANDING/ADD",
  BRANDING_ADD_SUCCESS: "BRANDING/ADD_SUCCESS",
  BRANDING_ADD_FAILED: "BRANDING/ADD_FAILED",
  BRANDING_DELETE: "BRANDING/DELETE",
  BRANDING_DELETE_SUCCESS: "BRANDING/DELETE_SUCCESS",
  BRANDING_DELETE_FAILED: "BRANDING/DELETE_FAILED",
  BRANDING_UPDATE: "BRANDING/UPDATE",
  BRANDING_UPDATE_SUCCESS: "BRANDING/UPDATE_SUCCESS",
  BRANDING_UPDATE_FAILED: "BRANDING/UPDATE_FAILED",
  BRANDING_GET_BRANDING_BY_ID_REQUEST: "BRANDING/GET_BRANDING_BY_ID_REQUEST",
  BRANDING_GET_BRANDING_BY_ID_SUCCESS: "BRANDING/GET_BRANDING_BY_ID_SUCCESS",
  BRANDING_GET_BRANDING_BY_ID_FAILED: "BRANDING/GET_BRANDING_BY_ID_FAILED",
};

export const fetchBrandingAction = () => {
  return { type: brandingConstant.BRANDING_FETCH };
};

export const fetchBrandingSuccessAction = (data) => {
  return { type: brandingConstant.BRANDING_FETCH_SUCCESS, payload: data };
};

export const fetchBrandingFailedAction = () => {
  return { type: brandingConstant.BRANDING_FETCH_FAILED };
};

export const addBrandingAction = () => {
  return { type: brandingConstant.BRANDING_ADD };
};

export const addBrandingSuccessAction = (data) => {
  return { type: brandingConstant.BRANDING_ADD_SUCCESS, payload: data };
};

export const addBrandingFailedAction = () => {
  return { type: brandingConstant.BRANDING_ADD_FAILED };
};

export const deleteBrandingAction = () => {
  return { type: brandingConstant.BRANDING_DELETE };
};

export const deleteBrandingSuccessAction = (data) => {
  return { type: brandingConstant.BRANDING_DELETE_SUCCESS, payload: data };
};

export const deleteBrandingFailedAction = () => {
  return { type: brandingConstant.BRANDING_DELETE_FAILED };
};

export const updateBrandingAction = () => {
  return { type: brandingConstant.BRANDING_UPDATE };
};

export const updateBrandingSuccessAction = (data) => {
  return { type: brandingConstant.BRANDING_UPDATE_SUCCESS, payload: data };
};

export const updateBrandingFailedAction = () => {
  return { type: brandingConstant.BRANDING_UPDATE_FAILED };
};

export const actGetBrandingByIdRequest = () => {
  return { type: brandingConstant.BRANDING_GET_BRANDING_BY_ID_REQUEST };
};

export const actGetBrandingByIdSuccess = () => {
  return { type: brandingConstant.BRANDING_GET_BRANDING_BY_ID_SUCCESS };
};

export const actGetBrandingByIdFailed = () => {
  return { type: brandingConstant.BRANDING_GET_BRANDING_BY_ID_FAILED };
};
