import React, { useContext, useEffect, useState } from "react";
import { context } from "../../../provider";
import api from "./../../../api";
import { dateFormat } from "./../../../utils/dateFormat";
import { useHistory } from "react-router-dom";
import * as Action from "../../../common/constants/blogConstant";
import "./style.scss";

export default function BlogItem(props) {
  const { blogItem, setIdBlogDelete } = props;
  let history = useHistory();

  return (
    <tr className="rowTable">
      <td>{blogItem.title}</td>

      <td>
        <img src={blogItem.url} alt="" className="img" />
      </td>

      <td>{dateFormat(blogItem.created_at)}</td>
      <td>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button
            className="btn btn-warning"
            onClick={() => {
              history.push(`/edit-blog/${blogItem.id}`);
            }}
          >
            <i className="fa fa-edit"></i>
          </button>
          <button
            className="btn btn-danger"
            data-toggle="modal"
            data-target="#DeleteBlogModal"
            onClick={() => {
              setIdBlogDelete(blogItem.id);
            }}
          >
            <i className="fa fa-trash-alt"></i>
          </button>
        </div>
      </td>
    </tr>
  );
}
