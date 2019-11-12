import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

class Header extends React.Component {
    state = {
        showAnswered: false,
    };

    render() {
        return (
            <Navbar bg="dark" expand="lg" className='navbar--class'>
                <Navbar.Brand href="#">Would You Rather</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to='/' className='nav-link'> Home </Link>
                        <Link to='/leaderboard' className='nav-link'> Leaderboard </Link>
                        <Link to="/new" className='nav-link'>New Question</Link>
                        <Link to="/login" className='nav-link'>Logout</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;
