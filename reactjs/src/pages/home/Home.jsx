import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Servers from '../../components/servers/Servers';
import ServerService from '../../service/ServerService';
import AuthService from '../../service/AuthService';




Home.propTypes = {
    
};

function Home(props) {
    const [servers, setServers] = useState([]);

    useEffect(()=>{
        AuthService.isAuth()
        const AllServers = async () => {
            await ServerService.getAllServer().then((res) => {
                setServers(res.data)
            }).catch(error => {
                alert(error.response.data.message)
            })
        }
        AllServers()
    }, [])


    return (
        <div>
            <Servers servers = {servers} />
        </div>
    );
}

export default Home;
