import React, { useState } from "react";
import { registerUser } from "../utils/api";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  let [registerErrors, setRegisterErrors] = useState({});
  let [registerSuccess, setRegisterSuccess] = useState(null);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(userData);
      console.log(response.data);
      setRegisterSuccess(response.data.message);
    } catch (error) {
      console.error(error);
      setRegisterErrors(error.response.data.errors);
    }
  };

  return (
    <div className="container">
      {registerSuccess && (
        <p className="alert alert-success mt-5">{registerSuccess}</p>
      )}

      <form onSubmit={handleRegister} className="my-5">
        <h1 className="text-center">Register</h1>
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
          {registerErrors.name && (
            <p className="error text-danger my-2">{registerErrors.name[0]}</p>
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
          {registerErrors.email && (
            <p className="error text-danger my-2">{registerErrors.email[0]}</p>
          )}
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control py-3"
            id="exampleInputPassword1"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
          />
          {registerErrors.password && (
            <p className="error text-danger my-2">
              {registerErrors.password[0]}
            </p>
          )}
        </div>
        <button type="submit" class="btn btn-primary">
          Register
        </button>
        <span class="mb-3 ms-4">
          <a href="/login">Already Have Account...?! Login.</a>
        </span>
      </form>
    </div>
  );
};

export default Register;
