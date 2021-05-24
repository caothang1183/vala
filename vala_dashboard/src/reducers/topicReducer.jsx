import { topicConstant } from "../common/constants/topicConstant";

export const topicReducer = (state, action) => {
  switch (action.type) {
    case topicConstant.TOPIC_FETCH: {
      return { ...state, loading: true };
    }
    case topicConstant.TOPIC_FETCH_SUCCESS: {
      return { topicList: [...action.payload], loading: false };
    }
    case topicConstant.TOPIC_FETCH_FAILED: {
      return { ...state, loading: false };
    }
    case topicConstant.TOPIC_ADD: {
      return { ...state, loading: true };
    }
    case topicConstant.TOPIC_ADD_SUCCESS: {
      return {
        ...state,
        // topicList: [...state.topicList, action.payload],
        loading: false,
      };
    }
    case topicConstant.TOPIC_ADD_FAILED: {
      return { ...state, loading: false };
    }
    case topicConstant.TOPIC_DELETE: {
      return { ...state, loading: true };
    }
    case topicConstant.TOPIC_DELETE_SUCCESS: {
      const arr = [...state.topicList].filter(
        (item) => item.id !== action.payload
      );
      return { ...state, loading: false, topicList: arr };
    }
    case topicConstant.TOPIC_DELETE_FAILED: {
      return { ...state, loading: false };
    }
    case topicConstant.TOPIC_UPDATE: {
      return { ...state, loading: true };
    }
    case topicConstant.TOPIC_UPDATE_SUCCESS: {
      // const arr = [...state.topicList].map((item) => {
      //   if (item.id === action.payload.id) {
      //     return { name: action.payload.topicName, id: action.payload.id };
      //   }
      //   return item;
      // });
      return { ...state, loading: false };
    }
    case topicConstant.TOPIC_UPDATE_FAILED: {
      return { ...state, loading: false };
    }

    case topicConstant.TOPIC_GET_TOPIC_BY_ID_REQUEST: {
      state.loading = true;
      return {...state}
    }

    case topicConstant.TOPIC_GET_TOPIC_BY_ID_SUCCESS: {
      state.loading = false;
      return {...state}
    }

    case topicConstant.TOPIC_GET_TOPIC_BY_ID_FAILED: {
      state.loading = false;
      return {...state}
    }


    default:
      return { ...state };
  }
};
