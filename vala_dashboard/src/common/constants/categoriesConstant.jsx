export const categoriesConstant = {
  CATEGORIES_FETCH_SUCCESS: "CATEGORIES/GET_LIST_SUCCESS",
  CATEGORIES_FETCH_FAILED: "CATEGORIES/GET_LIST_FAILED",
  CATEGORIES_FETCH: "CATEGORIES/GET_LIST_REQUEST",
  CATEGORIES_UPDATE: "CATEGORIES/UPDATE",
  CATEGORIES_DELETE: "CATEGORIES/DELETE",
  CATEGORIES_CREATE_REQUEST: "CATEGORIES/CREATE_REQUEST",
  CATEGORIES_CREATE_SUCCESS: "CATEGORIES/CREATE_SUCCESS",
  CATEGORIES_CREATE_FAILED: "CATEGORIES/CREATE_FAILED",
};

export const fetchCategoriesAction = () => {
  return { type: categoriesConstant.CATEGORIES_FETCH };
};

export const fetchCategoriesSuccessAction = (data) => {
  return { type: categoriesConstant.CATEGORIES_FETCH_SUCCESS, payload: data };
};

export const fetchCategoriesFailedAction = () => {
  return { type: categoriesConstant.CATEGORIES_FETCH_FAILED };
};

export const actDeleteCategories = (data) => {
  return { type: categoriesConstant.CATEGORIES_DELETE, payload: data };
};

export const actUpdateCategories = (data) => {
  return { type: categoriesConstant.CATEGORIES_UPDATE, payload: data };
};

export const actCreateNewCategoryRequest = () => {
  return { type: categoriesConstant.CATEGORIES_CREATE_REQUEST };
};

export const actCreateNewCategorySuccess = (data) => {
  return { type: categoriesConstant.CATEGORIES_CREATE_SUCCESS, payload: data };
};

export const actCreateNewCategoryFailed = () => {
  return { type: categoriesConstant.CATEGORIES_CREATE_FAILED };
};
