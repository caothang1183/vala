import React, { useContext, useEffect, useState } from "react";
import {
  deleteTopicAction,
  deleteTopicFailedAction,
  deleteTopicSuccessAction,
  fetchTopicAction,
  fetchTopicFailedAction,
  fetchTopicSuccessAction,
} from "../../../common/constants/topicConstant";
import Modal from "../../../components/Modal";
import { context } from "../../../provider";
import api from "./../../../api";
import ListTopicItem from "./ListTopicItem";
import "./ListTopic.scss";

const ListTopic = () => {
  const { topicState, topicDispatch } = useContext(context);
  const { topicList } = topicState;
  const [deleteTopicId, setDeleteTopicId] = useState(0);

  const deleteTopic = () => {
    console.log("deleting", deleteTopicId);
    topicDispatch(deleteTopicAction());
    api
      .delete(`/topics/${deleteTopicId}`)
      .then((res) => {
        if (res.status === 200) {
          topicDispatch(deleteTopicSuccessAction(deleteTopicId));
        }
      })
      .catch((err) => {
        topicDispatch(deleteTopicFailedAction());
        alert(err.response.data.message);
      });
  };

  useEffect(() => {
    topicDispatch(fetchTopicAction());
    api
      .get("/topics")
      .then((res) => {
        topicDispatch(fetchTopicSuccessAction(res.data));
        // console.log(res.data);
      })
      .catch((err) => {
        topicDispatch(fetchTopicFailedAction());
        alert(err.response);
      });
  }, [topicDispatch]);

  return (
    <div className="container-fluid" style={{ width: "80%" }}>
      <h1 className="h3 mb-4 text-gray-800">Topics</h1>

      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <div
              id="dataTable_wrapper"
              className="dataTables_wrapper dt-bootstrap4"
            >
              <div className="row"></div>
              <div className="row">
                <div className="col-sm-12">
                  <table className="table table-bordered dataTable">
                    <thead>
                      <tr role="row">
                        <th style={{ width: "auto", minWidth: "100px" }}>
                          Name
                        </th>
                        <th style={{ width: "40%" }}>Image</th>
                        <th>Description</th>
                        <th style={{ width: "auto" }}> Created At </th>
                        <th style={{ width: "120px" }}>Options</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topicList.length === 0 ? (
                        <tr>
                          <td>no data</td>
                          <td>no data</td>
                          <td>no data</td>
                          <td>no data</td>
                          <td>no data</td>
                        </tr>
                      ) : (
                        topicList.map((item) => (
                          <ListTopicItem
                            key={item.id}
                            topicItem={item}
                            setDeleteTopicId={setDeleteTopicId}
                          />
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        name="DeleteTopic"
        message={`Changes cannot be undone, please make sure you want to continue this action.`}
        func={deleteTopic}
      />
    </div>
  );
};

export default ListTopic;
