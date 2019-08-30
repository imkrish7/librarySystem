import React, { Component } from 'react';
import './navbar.css';

class AppNavbar extends Component{

    constructor(props){
        super(props);
    }

    render(){

        return(
    
           <nav className="navbar">
               <h3>Admin</h3>
               <h3><a href="/">Home</a></h3>
           </nav>
        );
    }

}

export default AppNavbar;