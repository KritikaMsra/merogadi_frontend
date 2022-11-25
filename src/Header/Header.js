import React, { Component} from "react"
import {Link} from "react-router-dom";
import {Navbar,Nav} from 'react-bootstrap';
import Header1 from './header1';
import NavbarLayout from './header2';
import {Container,Col,Row} from 'react-bootstrap';
 
const Header = (props)=>{
 
    return(
        <React.Fragment>
            <Header1/>
            <NavbarLayout/>
        </React.Fragment>
    )
 
}


 
export default Header;