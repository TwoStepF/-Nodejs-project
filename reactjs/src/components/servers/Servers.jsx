import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Server from '../server/server';
import { Link, useLocation } from 'react-router-dom';
import "./server.css"
import ReactToExcel from "react-html-table-to-excel";

Servers.propTypes = {
    
};
function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
}
function Servers({servers}) {
    let query = useQuery();
    const [admin, setAdmin] = useState(query.get('name'));
    const [status, setStatus] = useState(query.get('status'));
    const [type, setType] = useState(query.get('type'));
    const [order, setOrder] = useState(query.get('order'));
    const reset = () =>{
        window.location.replace('/')
    }
    const handle = () =>{
        let key = query.get('key')
        let name='', stt ='', tp ='', or =''
    
        if( admin !== null && admin !== ''){
            name = `name=${admin}&`
        }
        if( status !== null && status !== ''){
            stt = `status=${status}&`
        }
        if( type !== null && type !== ''){
            tp = `type=${type}&`
        }
        if( order !== null &&  order !== ''){
            or = `order=${order}&`
        }
        if( key === null){
            window.location.replace(`/search?${name}${stt}${tp}${or}`)
        }
        if(key !== null){
            window.location.replace(`/search?key=${query.get('key')}&${name}${stt}${tp}${or}`)
        }
    }
    return (
        <div>
            <div class="center">
                <div class="filter">
                <span>
                    <select onChange={(e) => {setAdmin(e.target.value);}} defaultValue={admin}>
                        <option value="">Tất cả</option>
                        <option value={localStorage.getItem('username')}>Của tôi</option>
                    </select>
                </span>
                <span>
                    <select onChange={(e) => {setStatus(e.target.value);}}  defaultValue={status}>
                        <option value="">N/A</option>
                        <option value='true'>On</option>
                        <option value="false">Off</option>
                    </select>
                </span>
                <span>
                    <select onChange={(e) => {setType(e.target.value);}} defaultValue={type}>
                        <option value="">N/A</option>
                        <option value="speed">speed</option>
                        <option value="ram">ram</option>
                    </select>
                </span>
                <span>
                    <select onChange={(e) => {setOrder(e.target.value); }} defaultValue={order}>
                        <option value="">N/A</option>
                        <option value="desc">cao nhất</option>
                        <option value="asc">thấp nhất</option>
                    </select>
                </span>
                <button onClick={handle} class="btnLoc">lọc</button>
                <button onClick={reset} class="btnLoc">Xóa tất cả</button>
            </div>
                
            </div>
            {servers.length === 0 ? (
                <h3>sorry! not found</h3>
            ) : (
                <div class="center">
                    <table class="styled-table" id="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Run SSH</th>
                                <th>Speed</th>
                                <th>Ram</th>
                                <th>Address</th>
                                <th>Admin</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {servers?.map((data) => (
                                <Server server = {data}/>
                            ))}
                        </tbody>
                    </table>
                    <ReactToExcel table="table" filename="server" sheet="sheet" buttonText="export" />
                </div>
                
            )}
        </div>
    );
}

export default Servers;