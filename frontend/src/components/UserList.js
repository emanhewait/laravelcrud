import React, { useState, useEffect } from "react";
import { getUsers, deleteUser } from "../utils/api";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigation("/login");
    }
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleView = async (userId) => {
    navigation(`/users/${userId}`);
  };
  const handleEdit = async (userId) => {
    navigation(`/users/${userId}/edit`);
  };
  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error(error);
    }
  };
  const logout = () => {
    localStorage.removeItem("accessToken");
    navigation("/login");
  };

  return (
    <div className="container">
      <div className="container text-end mt-5">
        <button className="btn btn-primary" onClick={logout}>
          Logout
        </button>
      </div>
      <h2 className="my-5">User List</h2>
      <table class="table table-striped">
        <thead>
          <th>User Name</th>
          <th>User Email</th>
          <th>User Action</th>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="me-3 btn btn-primary"
                  onClick={() => handleView(user.id)}
                >
                  View
                </button>
                <button
                  className="me-3 btn btn-success"
                  onClick={() => handleEdit(user.id)}
                >
                  Edit
                </button>
                <button
                  className="me-3 btn btn-danger"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
