import React from "react";
import PropTypes from "prop-types";
import "./Auth.scss";

function Login(props) {
  return (
    <div className="login">
      <h1>Đăng nhập</h1>
      <form>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" placeholder="Email..." />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" placeholder="Password..." />
        </div>
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
}

Login.propTypes = {};

export default Login;
