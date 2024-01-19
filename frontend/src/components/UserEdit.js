import React, { useState, useEffect } from "react";
import { getUser, updateUser } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const UserEdit = () => {
  const [userData, setUserData] = useState({});
  const { id } = useParams();
  const navigation = useNavigate();
  let [editErrors, setEditErrors] = useState({});
  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(id, { name: userData.name }, { email: userData.email });
    navigation("/users");
  };
  const logout = () => {
    localStorage.removeItem("accessToken");
    navigation("/login");
  };
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigation("/login");
    }
    const fetchUser = async () => {
      try {
        const response = await getUser(id);
        setUserData(response.data.data);
      } catch (error) {
        console.error(error);
        setEditErrors(error.response.data.errors);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="container">
      <div className="container text-end mt-5">
        <button className="btn btn-primary" onClick={logout}>
          Logout
        </button>
      </div>
      <form onSubmit={handleSubmit} className="my-5">
        <h1 className="text-center">Edit Profile</h1>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Name
          </label>
          <input
            type="text"
            class="form-control py-3"
            name="name"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={userData.name}
            onChange={handleInputChange}
          />
          {editErrors.name && (
            <p className="error text-danger my-2">{editErrors.name[0]}</p>
          )}
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="text"
            class="form-control py-3"
            name="email"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={userData.email}
            onChange={handleInputChange}
          />
          {editErrors.email && (
            <p className="error text-danger my-2">{editErrors.email[0]}</p>
          )}
        </div>
        <button type="submit" class="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default UserEdit;
