import { categoriesConstant } from "../common/constants/categoriesConstant";

export const categoriesReducer = (state, action) => {
  switch (action.type) {
    case categoriesConstant.CATEGORIES_FETCH: {
      return { ...state, loading: true };
    }

    case categoriesConstant.CATEGORIES_FETCH_SUCCESS: {
      return { categoriesList: [...action.payload], loading: false };
    }

    case categoriesConstant.CATEGORIES_FETCH_FAILED: {
      return { ...state, loading: false };
    }

    case categoriesConstant.CATEGORIES_UPDATE: {
      let list = [...state.categoriesList];
      let index = list.findIndex((item) => {
        return item.id === action.payload.id;
      });
      if (index !== -1) {
        list[index] = action.payload;
      }
      state.categoriesList = list;
      return {
        ...state,
      };
    }

    case categoriesConstant.CATEGORIES_DELETE: {
      let _newList = [...state.categoriesList].filter((item) => {
        return item.id !== action.payload;
      });
      state.categoriesList = _newList;
      return { ...state };
    }

    case categoriesConstant.CATEGORIES_CREATE_REQUEST: {
      state.loading = true;
      return { ...state };
    }

    case categoriesConstant.CATEGORIES_CREATE_SUCCESS: {
      let newList = [...state.categoriesList];
      newList.push(action.payload);
      state.categoriesList = newList;
      state.loading = false;
      return { ...state };
    }

    case categoriesConstant.CATEGORIES_CREATE_FAILED: {
      state.loading = false;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
