import React, { useState, useEffect } from "react";
import { loginUser } from "../utils/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  let [loginErrors, setLoginErrors] = useState({});

  const navigation = useNavigate();

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoginErrors({});
      const response = await loginUser(credentials);
      let token = response.data.access_token;
      localStorage.setItem("accessToken", token);
      navigation("/users");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      if (error.response.data.errors) {
        setLoginErrors(error.response.data.errors);
      } else if (error.response.data.message) {
        setLoginErrors({ message: error.response.data.message });
      }
    }
  };
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigation("/users");
    }
  }, []);
  return (
    <div className="container">
      <form onSubmit={handleLogin} className="my-5">
        <h1 className="text-center">Login</h1>
        {loginErrors.message && (
          <p className="error alert alert-danger">{loginErrors.message}</p>
        )}
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control py-3"
            name="email"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={handleInputChange}
          />
          {loginErrors.email && (
            <p className="error text-danger my-2">{loginErrors.email[0]}</p>
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
            value={credentials.password}
            onChange={handleInputChange}
          />
          {loginErrors.password && (
            <p className="error text-danger my-2">{loginErrors.password[0]}</p>
          )}
        </div>
        <button type="submit" class="btn btn-primary">
          Login
        </button>
        <span class="mb-3 ms-4">
          <a href="/register">Don't Have Account...?! Create One.</a>
        </span>
      </form>
    </div>
  );
};

export default Login;
