import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles/navbar.css';

class AppNavbar extends Component{


    render(){

        return(
    
           <nav className="navbar">
               <h3>Library</h3>
               <h3><Link to="/">Home</Link></h3>
           </nav>
        );
    }

}

export default AppNavbar;