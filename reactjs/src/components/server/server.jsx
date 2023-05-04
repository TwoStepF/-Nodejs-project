import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ServerService from '../../service/ServerService';

Server.propTypes = {
    
};

function Server({server}) {
    const handle = async (e) => {
        try{
            e.preventDefault();
            const res = await ServerService.deleteServer(server.id)
            if(res.data.status === 'OK'){
                alert(res.data.message)
                window.location.reload()
            }else{
                alert(res.data.message)
            }
        }catch(err){
            console.log(err)
        }
    }
    return (
            <tr>
                <td>{server.id}</td>
                <td>{server.name}</td>
                <td>{server.status}</td>
                <td>{server.isRunSSH}</td>
                <td>{server.speed}</td>
                <td>{server.ram}</td>
                <td>{server.address}</td>
                <td>{server.admin}</td>
                <td><Link to={"/update/" + server.id}><button class="btnXoa">sửa</button><button onClick={handle} class="btnSua">xóa</button></Link></td>

             </tr>
    );
}

export default Server;