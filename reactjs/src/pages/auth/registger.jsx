import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import axiosClient from '../../service/axiosClient';
import AuthService from '../../service/AuthService';

Registger.propTypes = {
    
};

function Registger(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault();
        await AuthService.register(username,password).then((res) => {
            alert(res.data.message)
            window.location.replace("/login")
        }).catch((err) => {
            alert(err.response.data.message)
        })
    }
    return (
      <div class="login-wrapper">
      <form onSubmit={handleSubmit} class="form">
            <h2>Register</h2>
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

              <button type="submit" class="submit-btn">Register</button>
        </form>
    </div>
    );
}

export default Registger;