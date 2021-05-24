import React from "react";
import { useHistory } from "react-router";
import { dateFormat } from "./../../../utils/dateFormat";

const ListProjectItem = ({ projectItem, setDeleteProjectId }) => {
  const history = useHistory();
  return (
    <tr>
      <td>{projectItem.project_name}</td>
      <td>
        <img style={{ width: "100%" }} src={projectItem.url} />
      </td>
      <td>{projectItem.title}</td>
      <td>{dateFormat(projectItem.created_at)}</td>
      <td>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button
            className="btn btn-warning"
            onClick={() => {
              history.push(`/edit-project/${projectItem.id}`);
            }}
          >
            <i className="fa fa-edit"></i>
          </button>
          <button
            className="btn btn-danger"
            data-toggle="modal"
            data-target="#DeleteProjectModal"
            onClick={() => setDeleteProjectId(projectItem.id)}
          >
            <i className="fa fa-trash-alt"></i>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ListProjectItem;
