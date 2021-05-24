import { projectConstant } from "./../common/constants/projectConstant";

export const projectReducer = (state, action) => {
  switch (action.type) {
    case projectConstant.PROJECT_FETCH: {
      return { ...state, loading: true };
    }
    case projectConstant.PROJECT_FETCH_SUCCESS: {
      return { projectList: [...action.payload], loading: false };
    }
    case projectConstant.PROJECT_FETCH_FAILED: {
      return { ...state, loading: false };
    }
    case projectConstant.PROJECT_ADD: {
      return { ...state, loading: true };
    }
    case projectConstant.PROJECT_ADD_SUCCESS: {
      return { ...state, loading: false };
    }
    case projectConstant.PROJECT_ADD_FAILED: {
      return { ...state, loading: false };
    }
    case projectConstant.PROJECT_DELETE: {
      return { ...state, loading: true };
    }
    case projectConstant.PROJECT_DELETE_SUCCESS: {
      const arr = [...state.projectList].filter(
        (item) => item.id !== action.payload
      );
      return { ...state, projectList: arr, loading: false };
    }
    case projectConstant.PROJECT_DELETE_FAILED: {
      return { ...state, loading: false };
    }
    case projectConstant.PROJECT_UPDATE: {
      return { ...state, loading: true };
    }
    case projectConstant.PROJECT_UPDATE_SUCCESS: {
      return { ...state, loading: false };
    }
    case projectConstant.PROJECT_UPDATE_FAILED: {
      return { ...state, loading: false };
    }
    default:
      return { ...state };
  }
};
