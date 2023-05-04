import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ServerService from '../../service/ServerService';
import { useLocation } from 'react-router-dom';

import Servers from '../../components/servers/Servers';


Search.propTypes = {
    
};

function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Search(props) {
    let query = useQuery();
    const [servers, setServers] = useState([]);
    const [bool, setBool] = useState(true);
    useEffect(() => {
        const AllServers = async () => {
            const res = await ServerService.getByKey(query.get("key"), query.get("name"), query.get("status"), query.get("type"), query.get("order"))
            setServers(res.data)
        }
        AllServers()
    }, [])
    return (
        <div>
            <Servers servers = {servers} />
        </div>
    );
}

export default Search;