import React, { useState, useEffect } from "react";
import { getUser } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export const UserView = () => {
  const [user, setUser] = useState([]);
  const { id } = useParams();
  const navigation = useNavigate();
  const [notFound, setNotFoundError] = useState(null);

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
        setUser(response.data.data);
      } catch (error) {
        console.error(error);
        setNotFoundError("Page Not Found");
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
      {notFound ? (
        <p className="error alert alert-danger mt-5 fs-1 text-center p-3">
          {notFound}
        </p>
      ) : (
        <div>
          <h2 className="my-5">User Profile</h2>
          <p>
            {" "}
            <span>Name :</span> {user.name}
          </p>
          <p>
            {" "}
            <span>Email :</span> {user.email}
          </p>
        </div>
      )}
    </div>
  );
};
