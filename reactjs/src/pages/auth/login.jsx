import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { useState } from 'react';
import AuthService from '../../service/AuthService';
import "./login.css"
Login.propTypes = {
    
};

function Login(props) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const handleSubmit = async (e) => {
     e.preventDefault();
     await AuthService.login(username, password).then((res) => {
         localStorage.setItem('username', res.data.username);
         localStorage.setItem('token', res.data.token);
         localStorage.setItem('refreshToken', res.data.refreshToken);
         window.location.replace("/")
     }).catch((err) => {
         alert(err.response.data.message)
     })
  }
  return (
      <div class="login-wrapper">
        <form onSubmit={handleSubmit} class="form">
              <h2>Login</h2>
                <div class="input-group">

                  <input
                        id="loginUser"
                        type="text"
                        className="loginrInput"
                        placeholder="Username"
                        onChange={e => setUsername(e.target.value)}
                      />
                </div>
                <div class="input-group">

                  <input
                        id="loginPassword"
                        type="password"
                        className="loignInput"
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                      /> 
                </div>

                <button type="submit" class="submit-btn">Login</button>
          </form>
      </div>
  );
}

export default Login;

