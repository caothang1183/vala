import { dateFormat } from "./../../../utils/dateFormat";
import React, { useContext, useEffect, useState } from "react";
import { context } from "../../../provider";
import api from "./../../../api";
import * as Action from "../../../common/constants/categoriesConstant";

export default function CategoriesItem(props) {
  const { categoriesItem, setIdDelete } = props;
  const { categoriesDispatch } = useContext(context);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  

  useEffect(() => {
    setName(categoriesItem.name);
  }, []);

  function handleUpdate(id, newName) {
    api
      .post(`/cate/${id}`, {
        name: newName,
      })
      .then((res) => {
        categoriesDispatch(Action.actUpdateCategories(res.data));
        setIsEdit(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  function handleError(event) {
    event.target.value === "" ? setError("*Không được để trống") : setError("");
  }

  return (
    <tr>
      <td>
        {isEdit ? (
          <input
            className="input"
            value={name || ""}
            onChange={(event) => {
              setName(event.target.value);
            }}
            onKeyUp={(event) => {
              handleError(event);
              if (event.keyCode === 13 && error === "") {
                handleUpdate(categoriesItem.id, name);
              }
            }}
            onBlur={(event) => {
              if (error === "") {
                handleUpdate(categoriesItem.id, name);
              } else {
                handleError(event);
              }
            }}
          />
        ) : (
          <span>{categoriesItem.name}</span>
        )}
        <span
          className="text-danger"
          style={{ fontSize: "13px", fontWeight: 600 }}
        >
          {error}
        </span>
      </td>
      <td>{dateFormat(categoriesItem.created_at)}</td>
      <td style={{ display: "flex", justifyContent: "space-around" }}>
        {isEdit ? (
          <button
            className="btn btn-primary"
            onClick={() => {
              if (name !== "") {
                handleUpdate(categoriesItem.id, name);
              }
            }}
          >
            <i className="fa fa-edit"></i>
          </button>
        ) : (
          <button className="btn btn-warning" onClick={() => setIsEdit(true)}>
            <i className="fa fa-edit"></i>
          </button>
        )}

        <button
          className="btn btn-danger"
          data-toggle="modal"
          data-target="#DeleteCategoryModal"
          onClick={() => {
            setIdDelete(categoriesItem.id);
          }}
        >
          <i className="fa fa-trash-alt"></i>
        </button>
      </td>
    </tr>
  );
}
