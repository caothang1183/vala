export const projectConstant = {
  PROJECT_FETCH_SUCCESS: "PROJECT/FETCH_SUCCESS",
  PROJECT_FETCH_FAILED: "PROJECT/FETCH_FAILED",
  PROJECT_FETCH: "PROJECT/FETCH",
  PROJECT_ADD_SUCCESS: "PROJECT/ADD_SUCCESS",
  PROJECT_ADD_FAILED: "PROJECT/ADD_FAILED",
  PROJECT_ADD: "PROJECT/ADD",
  PROJECT_DELETE_SUCCESS: "PROJECT/DELETE_SUCCESS",
  PROJECT_DELETE_FAILED: "PROJECT/DELETE_FAILED",
  PROJECT_DELETE: "PROJECT/DELETE",
  PROJECT_UPDATE_SUCCESS: "PROJECT/UPDATE_SUCCESS",
  PROJECT_UPDATE_FAILED: "PROJECT/UPDATE_FAILED",
  PROJECT_UPDATE: "PROJECT/UPDATE",
};

export const fetchProjectAction = () => {
  return { type: projectConstant.PROJECT_FETCH };
};

export const fetchProjectSuccessAction = (data) => {
  return { type: projectConstant.PROJECT_FETCH_SUCCESS, payload: data };
};

export const fetchProjectFailedAction = () => {
  return { type: projectConstant.PROJECT_FETCH_FAILED };
};

export const addProjectAction = () => {
  return { type: projectConstant.PROJECT_ADD };
};

export const addProjectSuccessAction = () => {
  return { type: projectConstant.PROJECT_ADD_SUCCESS };
};

export const addProjectFailedAction = () => {
  return { type: projectConstant.PROJECT_ADD_FAILED };
};

export const deleteProjectAction = () => {
  return { type: projectConstant.PROJECT_DELETE };
};

export const deleteProjectSuccessAction = (data) => {
  return { type: projectConstant.PROJECT_DELETE_SUCCESS, payload: data };
};

export const deleteProjectFailedAction = () => {
  return { type: projectConstant.PROJECT_DELETE_FAILED };
};

export const updateProjectAction = () => {
  return { type: projectConstant.PROJECT_UPDATE };
};

export const updateProjectSuccessAction = () => {
  return { type: projectConstant.PROJECT_UPDATE_SUCCESS };
};

export const updateProjectFailedAction = () => {
  return { type: projectConstant.PROJECT_UPDATE_FAILED };
};
