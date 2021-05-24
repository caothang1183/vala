import React, { useEffect, useContext, useState } from "react";
import * as Action from "../../../common/constants/userConstant";
import { context } from "../../../provider";
import api from "../../../api";
import { dateFormat } from "../../../utils/dateFormat";

export default function UserItem(props) {
  const { userItem } = props;
  const { userDispatch} = useContext(context);

  const handleChangeUpdateActivate = (id, isActive) => {
    userDispatch(Action.actUpdateActivatedRequest());
    api.post(`/users/${id}&active=${isActive}`)
    .then((res) => {
        userDispatch(Action.actUpdateActivatedSuccess(id))
        console.log(res)
    })
    .catch(err => {
        userDispatch(Action.actUpdateActivatedFailed());
        alert(err.response)
    })
  }

  return (
    <tr>
      <td>{userItem.first_name}</td>
      <td>{userItem.last_name}</td>
      <td>{userItem.email}</td>
      <td>{dateFormat(userItem.created_at)}</td>
      <td>
        <input type="checkbox" name='activated' 
        defaultChecked={userItem.activated}
        onChange={(e) => {
            // console.log(userItem.id)
            handleChangeUpdateActivate(userItem.id, e.target.checked)
        }}
        />
      </td>
    </tr>
  );
}
