import React, { useContext, useState } from "react";
import {
  updateBrandingAction,
  updateBrandingFailedAction,
  updateBrandingSuccessAction,
} from "../../../common/constants/brandingConstant";
import { context } from "../../../provider";
import { dateFormat } from "../../../utils/dateFormat";
import api from "../../../api";
import { useHistory } from "react-router-dom";

const ListBrandingItem = ({ brandingItem, setDeleteBrandingId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [brandingName, setBrandingName] = useState(brandingItem.name);
  const { brandingDispatch, brandingState } = useContext(context);
  const { loading } = brandingState;

  let history = useHistory();

  const handleEdit = (id) => {
    console.log(brandingName);
    brandingDispatch(updateBrandingAction());
    api
      .post(`/branding/${id}`, { name: brandingName })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          brandingDispatch(updateBrandingSuccessAction({ id, brandingName }));
        }
        setIsEditing(false);
      })
      .catch((err) => {
        brandingDispatch(updateBrandingFailedAction());
        console.log(err.response);
        setIsEditing(false);
      });
  };

  return (
    <tr>
      {isEditing ? (
        <td>
          <input
            type="text"
            name="brandingName"
            value={brandingName}
            onChange={(e) => setBrandingName(e.target.value)}
          />
        </td>
      ) : (
        <td>{brandingItem.name}</td>
      )}

      <td>
        <img src={brandingItem.url} alt="" style={{ width: "100%" }} />
      </td>
      <td>{brandingItem.description}</td>
      <td>{dateFormat(brandingItem.created_at)}</td>
      <td>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button
            className="btn btn-warning"
            onClick={() => {
              history.push(`/edit-branding/${brandingItem.id}`);
            }}
          >
            <i className="fa fa-edit"></i>
          </button>

          <button
            className="btn btn-danger"
            data-toggle="modal"
            data-target="#DeleteBrandingModal"
            onClick={() => setDeleteBrandingId(brandingItem.id)}
          >
            <i className="fa fa-trash-alt"></i>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ListBrandingItem;
