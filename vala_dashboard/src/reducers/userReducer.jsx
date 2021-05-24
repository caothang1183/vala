import { userConstant } from "../common/constants/userConstant";

export const userReducer = (state, action) => {
  switch (action.type) {
    case userConstant.USER_FETCH_REQUEST:
      state.loading = true;
      return { ...state };

    case userConstant.USER_FETCH_FAILED:
      state.loading = false;
      return { ...state };

    case userConstant.USER_FETCH_SUCCESS:
      state.loading = false;
      state.userList = action.payload;
      return { ...state };

    case userConstant.USER_UPDATE_ACTIVATED_REQUEST:
      return { ...state };

    case userConstant.USER_UPDATE_ACTIVATED_SUCCESS:
      let list = [...state.userList]
      let index = [...state.userList].findIndex(item => {
        return item.id === action.payload
      })
      if(index!==-1){
        list[index].activated = !list[index].activated
      }

      state.userList = list
      return { ...state };

    case userConstant.USER_UPDATE_ACTIVATED_FAILED:
      return { ...state };
    default:
      return { ...state };
  }
};
