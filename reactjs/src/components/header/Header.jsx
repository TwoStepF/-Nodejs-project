import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import "./header.css"
import AuthService from '../../service/AuthService';


Header.propTypes = {
    
};
const logout = () => {
    AuthService.logout()
}
function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
}
function Header(props) {
    let query = useQuery();
    const [name, setName] = useState('');
    const [bool, setBool] = useState(true);
    const [key, setKey] = useState(query.get('key'));
    useEffect(()=>{
        if(localStorage.getItem('username')){
            setName(localStorage.getItem('username'))
        }else{
            setBool(false)
        }
    }, [])
    const reload = () => {
        window.location.reload()
    }
    return (
        <div class="navbar">
            <div class="icon">
             <Link to = '/' class="headerItem"><h2 class="logo">Server</h2></Link>
            </div>
            <div class="menu">

                    { 
                        !bool ? 
                        <ul class="auth">
                                <li><Link to = '/login' class="headerItem"> LOGIN</Link></li>
                                <li><Link to = '/register' class="headerItem">REGISTER</Link></li>
                        </ul> :
                        <ul>
                            <div class="search">
                                    <input
                                        type="text"
                                        class="srch" 
                                        placeholder="Enter your key..."
                                        defaultValue={key}
                                        onChange={e => setKey(e.target.value)}
                                    />
        
                            
                                        <button onClick={reload} class="btnLogout">
                                            <Link class="headerItem" to={"/search?key=" + key}>
                                                Tìm kiếm
                                                </Link>
                                        </button>
                            
                                </div>
                                <li className="inline"><Link to = '/create' class="headerItem">NEW SERVER</Link></li>
                            
                                <button class="btnL" onClick={logout}>
                                    Logout
                                </button>
                        </ul> 
            }


            </div>
            
        </div>
    );
}

export default Header;
 