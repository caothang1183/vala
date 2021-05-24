import React, { createContext, useReducer } from "react";
import { projectReducer } from "../reducers/projectReducer";
import { topicReducer } from "../reducers/topicReducer";
import { authReducer } from "./../reducers/authReducer";
import { categoriesReducer } from "./../reducers/categoriesReducer";
import { blogReducer } from "./../reducers/blogReducer";
import { brandingReducer } from "./../reducers/brandingReducer";
import { userReducer } from "./../reducers/userReducer";

export const context = createContext(null);

export const Provider = ({ children }) => {
  const [auth, authDispatch] = useReducer(authReducer, {
    loading: false,
    token: "",
    first_name: "",
    last_name: "",
  });

  const [projectState, projectDispatch] = useReducer(projectReducer, {
    projectList: [],
    loading: false,
  });

  const [topicState, topicDispatch] = useReducer(topicReducer, {
    topicList: [],
    loading: false,
  });

  const [brandingState, brandingDispatch] = useReducer(brandingReducer, {
    brandingList: [],
    loading: false,
  });

  const [categoriesState, categoriesDispatch] = useReducer(categoriesReducer, {
    categoriesList: [],
    loading: false,
    isCreateNewCate: false,
  });

  const [blogState, blogDispatch] = useReducer(blogReducer, {
    blogList: [],
    loading: false,
    isUpdate: false,
  });

  const [userState, userDispatch] = useReducer(userReducer, {
    userList: [],
    loading: false,
  });
  return (
    <context.Provider
      value={{
        auth,
        authDispatch,
        projectState,
        projectDispatch,
        topicState,
        topicDispatch,
        categoriesState,
        categoriesDispatch,
        blogState,
        blogDispatch,

        brandingState,
        brandingDispatch,
        userState,
        userDispatch,
      }}
    >
      {children}
    </context.Provider>
  );
};
