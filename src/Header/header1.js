import React from 'react';
import { Container, Col, Row, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';



const Header1 = (props) => {
    const token = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user"))
    const logout = (e)=>{
        localStorage.clear();
        window.location.href = "/login"
    }
    return (
        <React.Fragment>
            <Container fluid className="bg-white">
                <Row>
                    <Col>
                        <Container>
                            <Row>
                                <Col style={{ background: "white", padding: "15px" }}>
                                    <div className="myDiv" style={{ height: "100%" }}>
                                        <Row>
                                            <Col lg={5} xs={12}>
                                                <div className="img__logo">
                                                    <img src="gugoui.PNG" alt="logo" className="d-block" />
                                                </div>
                                            </Col>

                                            <Col lg={4} className="d-none d-md-block">
                                                <div className="mySearch">
                                                    <input type="text" className="search" name="search" placeholder="Search.." />
                                                </div>
                                            </Col>

                                            <Col lg={3} className="d-none d-md-block" style={{ marginTop: "20px" }}>





                                                <Nav className="ml-5">
                                                    <Link className="nav-link" style={{ color: "black", fontWeight: "bold", fontSize: "16px" }} to="/"> <FaShoppingCart /> </Link>
                                                    {
                                                        token?
                                                        (
                                                            <div class="dropdown">
                                                            <button  type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                {user.username}
                                                            </button>
                                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                <p class="dropdown-item" onClick = {logout}>Logout</p>
                                                               
                                                            </div>
                                                            </div>
                                                        ):
                                                        (
                                                            <Link className="nav-link" style={{ color: "black", fontWeight: "bold", fontSize: "16px", marginTop: "2px" }} to="/login"> LOGIN</Link>
                                                        )
                                                    }
                                                   


                                                </Nav>


                                            </Col>

                                        </Row>
                                    </div>


                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Header1;