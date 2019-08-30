import React, { Component } from 'react';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

class AppNavbar extends Component{

    constructor(props){
        super(props);

        this.state = {
            isopen: false
        }
    }
    toggle = () => {
        this.setState({
            isopen: !this.state.isopen
        })
    }

    render(){

        return(
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">
                            Admin
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle}></NavbarToggler>
                        <Collapse isOpen={this.state.isopen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="/">Home</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
            </Navbar>
        </div>
        );
    }

}

export default AppNavbar;