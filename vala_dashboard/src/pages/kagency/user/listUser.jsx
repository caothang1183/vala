import React, { useEffect, useContext} from "react";
import { useHistory } from "react-router-dom";
import * as Action from "../../../common/constants/userConstant";
import { context } from "../../../provider";
import api from "../../../api";
import UserItem from "./UserItem";

export default function ListUser() {
  const { userState, userDispatch } = useContext(context);
  const { userList } = userState;

  let history = useHistory();

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("User"));
    if (user && user.role_id !== 1) {
      history.push("/dashboard");
    } else {
      userDispatch(Action.actGetListUserRequest());
      api
        .get("/users")
        .then((res) => {
          userDispatch(Action.actGetListUserSuccess(res.data.data));
        //   console.log(res.data.data);
        })
        .catch((err) => {
          userDispatch(Action.actGetListUserFailed());
          alert(err.response);
        });
    }
  }, []);

  function renderUserList() {
    let newList = userList.filter((item) => {
      return item.id !== JSON.parse(localStorage.getItem("User")).id;
    });
    if (newList.length > 0) {
      return newList.map((item) => <UserItem key={item.id} userItem={item} />);
    }
  }
  return (
    <div className="container-fluid" style={{ width: "80%" }}>
      <h1 className="h3 mb-4 text-gray-800">Users</h1>

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
                          First Name
                        </th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th> Created At </th>
                        <th>Activate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userList.length === 0 ? (
                        <tr></tr>
                      ) : (
                        renderUserList()
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
