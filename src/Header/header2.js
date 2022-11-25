import React from 'react';
import {Nav,Navbar, NavDropdown} from 'react-bootstrap';
import {Link,NavLink} from 'react-router-dom'

const NavbarLayout = (props)=>{
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
    return (
    <React.Fragment>
                <Navbar  expand="lg">

  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">

  <Nav className="mr-auto">
      <NavLink className="nav-link" activeClassName="active_class" exact to="/"> Home </NavLink>
      {/* <NavLink className="nav-link" activeClassName="active_class" to="/AboutUs"> About </NavLink> */}
      <NavLink className="nav-link" activeClassName="active_class" to="/shop"> Shop </NavLink>
      <NavLink className="nav-link" activeClassName="active_class" to="/garages"> Garage Map </NavLink>
      <NavLink className="nav-link" activeClassName="active_class" to="/showGiveaway"> Giveaway </NavLink>
      {/* <Link className="nav-link" activeClassName="active_class" to="/Product"> Product </Link> */}
      
      {
        token?
        (
          user.userType == "Admin"?
          (
            <NavLink className="nav-link" activeClassName="active_class" to="/admins"> Admin </NavLink>
          ):
          (
            <></>
          )
        ):
        (
          <></>
        )
      }
      
      {
        token?
        (
          <>
          <NavLink className="nav-link" activeClassName="active_class" to="/cart"> Cart </NavLink>
          <NavLink className="nav-link" activeClassName="active_class" to="/chat"> Chat </NavLink>
          <NavLink className="nav-link" activeClassName="active_class" to="/hire"> Add As RepairMan </NavLink>
          <NavLink className="nav-link" activeClassName="active_class" to="/repairmans"> RepairMans </NavLink>
          </>
        ):
        (
          <NavLink className="nav-link" activeClassName="active_class" to="/register"> Register</NavLink>
        )
      }
      
      
     
    </Nav>
    
  </Navbar.Collapse>
</Navbar>
</React.Fragment>
    )
}

export default NavbarLayout;