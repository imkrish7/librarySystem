import React from 'react'
import { Link } from 'react-router-dom';
import './styles/index.css';

const index = () => {
    return (
        <div className="main">
            <div className="admin">
                <Link to="/admin" >Admin</Link>
            </div>
            <div className="user" >
                <Link to="/user">User</Link>
            </div>
        </div>
    )
}

export default index
