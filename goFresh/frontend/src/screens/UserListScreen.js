import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_DETAILS_RESET } from "../constants/userConstants";

const UserListScreen = (props) => {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
    dispatch({
      type: USER_DETAILS_RESET,
    });
  }, [dispatch, successDelete]);
  const deleteHandler = (user) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(user._id));
    }
  };
  return (
    <div>
      <div className={"row ms-5 me-5"}>
        <h1>Users</h1>
        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        {successDelete && (
          <MessageBox variant="success">User Deleted Successfully</MessageBox>
        )}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table table-hover order-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th className="d-none d-sm-block">EMAIL</th>
                <th>SELLER</th>
                <th>ADMIN</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className={"align-content-center"}>
                  <td>
                    {user._id.substring(user._id.length - 5, user._id.length)}
                  </td>
                  <td>{user.name}</td>
                  <td className="d-none d-sm-block">{user.email}</td>
                  <td>{user.isSeller ? "YES" : " NO"}</td>
                  <td>{user.isAdmin ? "YES" : "NO"}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary btn-md "
                      onClick={() =>
                        props.history.push(`/user/${user._id}/edit`)
                      }
                    >
                      Edit
                    </button>
                    &nbsp;&nbsp;
                    <button
                      type="button"
                      className="btn btn-primary btn-md"
                      onClick={() => deleteHandler(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserListScreen;
