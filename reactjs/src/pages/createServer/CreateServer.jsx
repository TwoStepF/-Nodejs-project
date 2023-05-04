import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ServerService from '../../service/ServerService';

CreateServer.propTypes = {
    
};

function CreateServer(props) {
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault();
        await ServerService.createServer(name, address, password)
            .then(res => window.location.replace("/"))
            .catch((err) => {alert(err.response.data.message)}
            )
    }
    return (
      <div class="login-wrapper">
<form onSubmit={handleSubmit} class="form">
      <h2>New server</h2>
        <div class="input-group">

        <input
            type="text"
            className="Input"
            placeholder="Enter name..."
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div class="input-group">

        <input
            type="password"
            className="Input"
            placeholder="Enter password..."
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div class="input-group">

        <input
            type="password"
            className="Input"
            placeholder="Enter address..."
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" class="submit-btn">Create</button>
  </form>
</div>
    );
}

export default CreateServer;

