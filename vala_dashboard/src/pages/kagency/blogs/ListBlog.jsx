import React, { useContext, useEffect, useState } from "react";
import { context } from "../../../provider";
import api from "./../../../api";
import * as Action from "../../../common/constants/blogConstant";
import BlogItem from "./BlogItem";
import Modal from "../../../components/Modal";

export default function ListBlog() {
  const { blogDispatch, blogState } = useContext(context);
  const { blogList } = blogState;
  const [idBlogDelete, setIdBlogDelete] = useState('')

  useEffect(() => {
    blogDispatch(Action.actGetListBlogRequest());
    api
      .get("/blogs")
      .then((res) => {
        blogDispatch(Action.actGetListBlogSuccess(res.data));
      })
      .catch((err) => {
        blogDispatch(Action.actGetListBlogFailed());
        console.log(err);
      });
  }, []);


  const handleDelete = () => {
    blogDispatch(Action.actDeleteBlogRequest());
    api
      .delete(`/blogs/${idBlogDelete}`)
      .then(() => {
        blogDispatch(Action.actDeleteBlogSuccess(idBlogDelete));
      })
      .catch((err) => {
        blogDispatch(Action.actDeleteBlogFailed());
        console.log(err.response);
      });
  };



  return (
    <div className="blogs container-fluid" style={{ width: "80%" }}>
      <h1 className="h3 mb-4 text-gray-800">Blogs</h1>

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
                      <tr role="row"  >
                        <th style={{width: '20%'}}>Tilte</th>
                       
                        <th style={{width: '40%'}}>Image</th>
                        <th >Created At</th>
                        <th style={{ width: "120px" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogList.length===0 ? (
                         <tr>
                         <td>no data</td>
                       </tr>
                      ) : (
                        blogList.map((item) => (
                          <BlogItem key={item.id} blogItem={item} setIdBlogDelete={setIdBlogDelete} />
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
        name="DeleteBlog"
        message={`Changes cannot be undone, please make sure you want to continue this action.`}
        func={handleDelete}
      />
    </div>
  );
}
