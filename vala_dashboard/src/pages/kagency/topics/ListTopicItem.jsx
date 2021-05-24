import React from "react";
import { useHistory } from "react-router-dom";
import { dateFormat } from "../../../utils/dateFormat";

const ListTopicItem = ({ topicItem, setDeleteTopicId }) => {
  let history = useHistory();

  return (
    <tr>
      <td>{topicItem.name}</td>
      <td>
        <img src={topicItem.url} alt="" style={{ width: "100%" }} />
      </td>
      <td>{topicItem.description}</td>
      <td>{dateFormat(topicItem.created_at)}</td>
      <td>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button
            className="btn btn-warning"
            onClick={() => {
              history.push(`/edit-topic/${topicItem.id}`);
            }}
          >
            <i className="fa fa-edit"></i>
          </button>

          <button
            className="btn btn-danger"
            data-toggle="modal"
            data-target="#DeleteTopicModal"
            onClick={() => setDeleteTopicId(topicItem.id)}
          >
            <i className="fa fa-trash-alt"></i>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ListTopicItem;
