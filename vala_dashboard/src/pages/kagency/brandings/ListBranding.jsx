import React, { useContext, useEffect, useState } from "react";
import {
  deleteBrandingAction,
  deleteBrandingFailedAction,
  deleteBrandingSuccessAction,
  fetchBrandingAction,
  fetchBrandingFailedAction,
  fetchBrandingSuccessAction,
} from "../../../common/constants/brandingConstant";
import Modal from "../../../components/Modal";
import { context } from "../../../provider";
import api from "../../../api";
import ListBrandingItem from "./ListBrandingItem";
import "./ListBranding.scss";

const ListBranding = () => {
  const { brandingState, brandingDispatch } = useContext(context);
  const { brandingList } = brandingState;
  const [deleteBrandingId, setDeleteBrandingId] = useState(0);

  const deleteBranding = () => {
    console.log("deleting", deleteBrandingId);
    brandingDispatch(deleteBrandingAction());
    api
      .delete(`/branding/${deleteBrandingId}`)
      .then((res) => {
        if (res.status === 200) {
          brandingDispatch(deleteBrandingSuccessAction(deleteBrandingId));
        }
      })
      .catch((err) => {
        brandingDispatch(deleteBrandingFailedAction());
        alert(err.response.data.message);
      });
  };

  useEffect(() => {
    brandingDispatch(fetchBrandingAction());
    api
      .get("/branding")
      .then((res) => {
        brandingDispatch(fetchBrandingSuccessAction(res.data));
        console.log(res.data);
      })
      .catch((err) => {
        brandingDispatch(fetchBrandingFailedAction());
        alert(err.response);
      });
  }, [brandingDispatch]);

  return (
    <div className="container-fluid" style={{ width: "80%" }}>
      <h1 className="h3 mb-4 text-gray-800">Brandings</h1>

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
                      {brandingList.length === 0 ? (
                        <tr>
                          <td>no data</td>
                          <td>no data</td>
                          <td>no data</td>
                          <td>no data</td>
                          <td>no data</td>
                        </tr>
                      ) : (
                        brandingList.map((item) => (
                          <ListBrandingItem
                            key={item.id}
                            brandingItem={item}
                            setDeleteBrandingId={setDeleteBrandingId}
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
        name="DeleteBranding"
        message={`Changes cannot be undone, please make sure you want to continue this action.`}
        func={deleteBranding}
      />
    </div>
  );
};

export default ListBranding;
