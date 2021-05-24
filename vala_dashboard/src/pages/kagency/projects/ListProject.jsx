import { useContext, useEffect, useState } from "react";
import {
  deleteProjectAction,
  deleteProjectFailedAction,
  deleteProjectSuccessAction,
  fetchProjectAction,
  fetchProjectFailedAction,
  fetchProjectSuccessAction,
} from "../../../common/constants/projectConstant";
import Modal from "../../../components/Modal";
import { context } from "../../../provider";
import api from "./../../../api";
import EntrySelect from "./components/EntrySelect";
import ListIndex from "./components/ListIndex";
import Pagination from "./components/Pagination";
import ProjectSearch from "./components/ProjectSearch";
import ListProjectItem from "./ListProjectItem";

const ListProject = () => {
  const { projectDispatch, projectState } = useContext(context);
  const [deleteProjectId, setDeleteProjectId] = useState(0);
  const { projectList } = projectState;

  const deleteProject = () => {
    console.log(deleteProjectId);
    projectDispatch(deleteProjectAction());
    api
      .delete(`/projects/${deleteProjectId}`)
      .then((res) => {
        projectDispatch(deleteProjectSuccessAction(deleteProjectId));
        console.log(res.data);
      })
      .catch((err) => {
        projectDispatch(deleteProjectFailedAction());
        console.log(err.response);
      });
  };

  useEffect(() => {
    projectDispatch(fetchProjectAction());
    api
      .get("/projects")
      .then((res) => {
        projectDispatch(fetchProjectSuccessAction(res.data));
        console.log(res.data);
      })
      .catch((err) => {
        projectDispatch(fetchProjectFailedAction());
        console.log(err.response);
      });
  }, []);

  return (
    <div className="container-fluid" style={{ width: "80%" }}>
      <h1 className="h3 mb-4 text-gray-800">Projects</h1>
      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <div
              id="dataTable_wrapper"
              className="dataTables_wrapper dt-bootstrap4"
            >
              <div className="row">
                <EntrySelect />
                <ProjectSearch />
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <table className="table table-bordered dataTable">
                    <thead>
                      <tr role="row">
                        <th>Name</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Created At</th>
                        <th style={{ width: "130px" }}>Options</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projectList.length === 0 ? (
                        <tr>
                          <td>no data</td>
                          <td>no data</td>
                          <td>no data</td>
                          <td>no data</td>
                          <td>no data</td>
                        </tr>
                      ) : (
                        projectList.map((item) => (
                          <ListProjectItem
                            setDeleteProjectId={setDeleteProjectId}
                            key={item.id}
                            projectItem={item}
                          />
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row">
                <ListIndex />
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        name="DeleteProject"
        message={`Changes cannot be undone, please make sure you want to continue this action.`}
        func={deleteProject}
      />
    </div>
  );
};

export default ListProject;
