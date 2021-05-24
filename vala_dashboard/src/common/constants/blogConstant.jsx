export const blogConstant = {
  BLOG_FETCH_SUCCESS: "BLOG/GET_LIST_SUCCESS",
  BLOG_FETCH_FAILED: "BLOG/GET_LIST_FAILED",
  BLOG_FETCH: "BLOG/GET_LIST_REQUEST",
  BLOG_UPDATE_REQUEST: "BLOG/UPDATE_REQUEST",
  BLOG_UPDATE_SUCCESS: "BLOG/UPDATE_SUCCESS",
  BLOG_UPDATE_FAILED: "BLOG/UPDATE_FAILED",
  BLOG_DELETE_SUCCESS: "BLOG/DELETE_SUCCESS",
  BLOG_DELETE_FAILED: "BLOG/DELETE_FAILED",
  BLOG_DELETE_REQUEST: "BLOG/DELETE_REQUEST",
  BLOG_GET_ITEM_EDIT: "BLOG/GET_ITEM_EDIT",
  BLOG_CREATE_REQUEST: "BLOG/CREATE_REQUEST",
  BLOG_CREATE_SUCCESS: "BLOG/CREATE_SUCCESS",
  BLOG_CREATE_FAILED: "BLOG/CREATE_FAILED",
};

export const actGetListBlogRequest = () => {
  return { type: blogConstant.BLOG_FETCH };
};

export const actGetListBlogSuccess = (data) => {
  return { type: blogConstant.BLOG_FETCH_SUCCESS, payload: data };
};

export const actGetListBlogFailed = () => {
  return { type: blogConstant.BLOG_FETCH_FAILED };
};

export const actDeleteBlogRequest = () => {
  return { type: blogConstant.BLOG_DELETE_REQUEST };
};

export const actDeleteBlogSuccess = (id) => {
  return { type: blogConstant.BLOG_DELETE_SUCCESS, payload: id };
};

export const actDeleteBlogFailed = () => {
  return { type: blogConstant.BLOG_DELETE_FAILED };
};

export const actUpdateBlogRequest = () => {
  return { type: blogConstant.BLOG_UPDATE_REQUEST };
};

export const actUpdateBlogSuccess = (data) => {
  return { type: blogConstant.BLOG_UPDATE_SUCCESS, payload: data };
};

export const actUpdateBlogFailed = () => {
  return { type: blogConstant.BLOG_UPDATE_FAILED };
};


export const actCreateNewBlogRequest = () => {
  return {type: blogConstant.BLOG_CREATE_REQUEST}
}

export const actCreateNewBlogFailed = () => {
  return {type: blogConstant.BLOG_CREATE_FAILED}
}

export const actCreateNewBlogSuccess = (data) => {
  return {type: blogConstant.BLOG_CREATE_SUCCESS, payload: data}
}