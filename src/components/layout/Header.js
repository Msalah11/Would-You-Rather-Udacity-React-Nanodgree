import React from "react";
import {Nav, Navbar} from "react-bootstrap";

class Header extends React.Component {
    state = {
        showAnswered: false,
    };

    render() {
        return (
            <Navbar bg="dark" expand="lg" className='navbar--class'>
                <Navbar.Brand href="#home">Would You Rather</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Leaderboard</Nav.Link>
                        <Nav.Link href="#link">New</Nav.Link>
                        <Nav.Link href="#link">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;
