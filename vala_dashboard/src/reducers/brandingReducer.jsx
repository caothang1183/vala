import { brandingConstant } from "../common/constants/brandingConstant";

export const brandingReducer = (state, action) => {
  switch (action.type) {
    case brandingConstant.BRANDING_FETCH: {
      return { ...state, loading: true };
    }
    case brandingConstant.BRANDING_FETCH_SUCCESS: {
      return { brandingList: [...action.payload], loading: false };
    }
    case brandingConstant.BRANDING_FETCH_FAILED: {
      return { ...state, loading: false };
    }
    case brandingConstant.BRANDING_ADD: {
      return { ...state, loading: true };
    }
    case brandingConstant.BRANDING_ADD_SUCCESS: {
      return {
        ...state,
        // brandingList: [...state.brandingList, action.payload],
        loading: false,
      };
    }
    case brandingConstant.BRANDING_ADD_FAILED: {
      return { ...state, loading: false };
    }
    case brandingConstant.BRANDING_DELETE: {
      return { ...state, loading: true };
    }
    case brandingConstant.BRANDING_DELETE_SUCCESS: {
      const arr = [...state.brandingList].filter(
        (item) => item.id !== action.payload
      );
      return { ...state, loading: false, brandingList: arr };
    }
    case brandingConstant.BRANDING_DELETE_FAILED: {
      return { ...state, loading: false };
    }
    case brandingConstant.BRANDING_UPDATE: {
      return { ...state, loading: true };
    }
    case brandingConstant.BRANDING_UPDATE_SUCCESS: {
      // const arr = [...state.brandingList].map((item) => {
      //   if (item.id === action.payload.id) {
      //     return { name: action.payload.brandingName, id: action.payload.id };
      //   }
      //   return item;
      // });
      return { ...state, loading: false };
    }
    case brandingConstant.BRANDING_UPDATE_FAILED: {
      return { ...state, loading: false };
    }

    case brandingConstant.BRANDING_GET_BRANDING_BY_ID_REQUEST: {
      state.loading = true;
      return { ...state };
    }

    case brandingConstant.BRANDING_GET_BRANDING_BY_ID_SUCCESS: {
      state.loading = false;
      return { ...state };
    }

    case brandingConstant.BRANDING_GET_BRANDING_BY_ID_FAILED: {
      state.loading = false;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
