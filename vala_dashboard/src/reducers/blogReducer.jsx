import { blogConstant } from "../common/constants/blogConstant";

export const blogReducer = (state, action) => {
  switch (action.type) {
    case blogConstant.BLOG_FETCH:
      state.loading = true;
      return { ...state };

    case blogConstant.BLOG_FETCH_SUCCESS:
      state.loading = false;
      state.blogList = action.payload;
      return { ...state };

    case blogConstant.BLOG_UPDATE_FAILED:
      state.loading = false;
      return { ...state };

    case blogConstant.BLOG_DELETE_FAILED:
      return { ...state };

    case blogConstant.BLOG_DELETE_SUCCESS:
      let list = [...state.blogList].filter((item) => {
        return item.id !== action.payload;
      });
      state.blogList = list;
      return { ...state };

    case blogConstant.BLOG_DELETE_REQUEST:
      return { ...state };

    case blogConstant.BLOG_GET_ITEM_EDIT:
      state.blogEdit = action.payload;
      console.log(action.payload);
      return { ...state };

    case blogConstant.BLOG_UPDATE_REQUEST:
      state.isUpdate = true;
      return { ...state };

    case blogConstant.BLOG_UPDATE_FAILED:
      state.isUpdate = false;
      return { ...state };

    case blogConstant.BLOG_UPDATE_SUCCESS:
      state.blogEdit = {};
      state.isUpdate = false;
      return { ...state };

    case blogConstant.BLOG_CREATE_REQUEST:
      state.isUpdate = true;
      return { ...state };

    case blogConstant.BLOG_CREATE_SUCCESS:
      state.isUpdate = false;
      return { ...state };

    case blogConstant.BLOG_CREATE_FAILED:
      state.isUpdate = false;
      return { ...state };

      default:
        return {...state}
  }
};
