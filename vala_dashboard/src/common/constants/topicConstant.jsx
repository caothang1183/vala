export const topicConstant = {
  TOPIC_FETCH_SUCCESS: "TOPIC/LOGIN_SUCCESS",
  TOPIC_FETCH_FAILED: "TOPIC/LOGIN_FAILED",
  TOPIC_FETCH: "TOPIC/LOGIN",
  TOPIC_ADD: "TOPIC/ADD",
  TOPIC_ADD_SUCCESS: "TOPIC/ADD_SUCCESS",
  TOPIC_ADD_FAILED: "TOPIC/ADD_FAILED",
  TOPIC_DELETE: "TOPIC/DELETE",
  TOPIC_DELETE_SUCCESS: "TOPIC/DELETE_SUCCESS",
  TOPIC_DELETE_FAILED: "TOPIC/DELETE_FAILED",
  TOPIC_UPDATE: "TOPIC/UPDATE",
  TOPIC_UPDATE_SUCCESS: "TOPIC/UPDATE_SUCCESS",
  TOPIC_UPDATE_FAILED: "TOPIC/UPDATE_FAILED",
  TOPIC_GET_TOPIC_BY_ID_REQUEST: "TOPIC/GET_TOPIC_BY_ID_REQUEST",
  TOPIC_GET_TOPIC_BY_ID_SUCCESS: "TOPIC/GET_TOPIC_BY_ID_SUCCESS",
  TOPIC_GET_TOPIC_BY_ID_FAILED: "TOPIC/GET_TOPIC_BY_ID_FAILED",

};

export const fetchTopicAction = () => {
  return { type: topicConstant.TOPIC_FETCH };
};

export const fetchTopicSuccessAction = (data) => {
  return { type: topicConstant.TOPIC_FETCH_SUCCESS, payload: data };
};

export const fetchTopicFailedAction = () => {
  return { type: topicConstant.TOPIC_FETCH_FAILED };
};

export const addTopicAction = () => {
  return { type: topicConstant.TOPIC_ADD };
};

export const addTopicSuccessAction = (data) => {
  return { type: topicConstant.TOPIC_ADD_SUCCESS, payload: data };
};

export const addTopicFailedAction = () => {
  return { type: topicConstant.TOPIC_ADD_FAILED };
};

export const deleteTopicAction = () => {
  return { type: topicConstant.TOPIC_DELETE };
};

export const deleteTopicSuccessAction = (data) => {
  return { type: topicConstant.TOPIC_DELETE_SUCCESS, payload: data };
};

export const deleteTopicFailedAction = () => {
  return { type: topicConstant.TOPIC_DELETE_FAILED };
};

export const updateTopicAction = () => {
  return { type: topicConstant.TOPIC_UPDATE };
};

export const updateTopicSuccessAction = (data) => {
  return { type: topicConstant.TOPIC_UPDATE_SUCCESS, payload: data };
};

export const updateTopicFailedAction = () => {
  return { type: topicConstant.TOPIC_UPDATE_FAILED };
};


export const actGetTopicByIdRequest = () => {
  return {type: topicConstant.TOPIC_GET_TOPIC_BY_ID_REQUEST}
}

export const actGetTopicByIdSuccess = () => {
  return {type: topicConstant.TOPIC_GET_TOPIC_BY_ID_SUCCESS}
}

export const actGetTopicByIdFailed = () => {
  return {type: topicConstant.TOPIC_GET_TOPIC_BY_ID_FAILED}
}

