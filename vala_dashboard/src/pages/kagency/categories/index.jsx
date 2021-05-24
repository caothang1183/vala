import React, { useContext, useEffect, useState } from "react";
import { context } from "../../../provider";
import api from "./../../../api";
import * as Action from "../../../common/constants/categoriesConstant";
import Modal from "../../../components/Modal";
import CategoriesItem from "./CategoriesItem";
import "./style.scss";

export default function ListCategories() {
  const { categoriesDispatch, categoriesState } = useContext(context);
  const { categoriesList, loading } = categoriesState;
  const [idDelete, setIdDelete] = useState("");
  const [topicName, setTopicName] = useState("");

  function actGetListCategories() {
    categoriesDispatch(Action.fetchCategoriesAction());
    api
      .get("/cate")
      .then((res) => {
        categoriesDispatch(Action.fetchCategoriesSuccessAction(res.data));
        
      })
      .catch((err) => {
        categoriesDispatch(Action.fetchCategoriesFailedAction());
        console.log(err);
      });
  }

  useEffect(() => {
    actGetListCategories();
  }, []);

  function handleDelete() {
    api
    .delete(`/cate/${idDelete}`)
    .then((res) => {
      categoriesDispatch(Action.actDeleteCategories(idDelete));
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response);
    });
  }

  function handleSubmit(name) {
    categoriesDispatch(Action.actCreateNewCategoryRequest());
    api
      .post("/cate", [{ name: name }])
      .then((res) => {
        categoriesDispatch(Action.actCreateNewCategorySuccess(res.data));
        setTopicName("");
      })
      .catch(() => {
        categoriesDispatch(Action.actCreateNewCategoryFailed());
      });
  }

  return (
    <div className="categories container-fluid" style={{ width: "80%" }}>
      <h1 className="h3 mb-4 text-gray-800">Categories</h1>

      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Add New Category</span>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(topicName, event);
          }}
        >
          <input
            value={topicName || ""}
            type="text"
            className="form-control"
            disabled={loading}
            onChange={(event) => {
              setTopicName(event.target.value);
            }}
            onBlur={(event) => {
              if (topicName !== "") {
                handleSubmit(topicName, event);
              }
            }}
          />
        </form>
      </div>

      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <div
              id="dataTable_wrapper"
              className="dataTables_wrapper dt-bootstrap4"
            >
              <div className="row">
                <div className="col-sm-12">
                  <table className="table table-bordered dataTable">
                    <thead>
                      <tr role="row">
                        <th style={{ width: "auto" }}>Name</th>

                        <th style={{ width: "auto" }}>Created At</th>
                        <th style={{width: '120px'}}>Options</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoriesList.length === 0 ? (
                        <tr>
                          <td>no data</td>
                        </tr>
                      ) : (
                        categoriesList.map((item) => (
                          <CategoriesItem
                            key={item.id}
                            categoriesItem={item}
                            setIdDelete={setIdDelete}
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
        name="DeleteCategory"
        message={`Changes cannot be undone, please make sure you want to continue this action.`}
        func={handleDelete}
      />
    </div>
  );
}
