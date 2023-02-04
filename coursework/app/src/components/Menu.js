import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import './App.css';

/**
 * Menu is a functional component that returns a navbar with a list of links to different pages.
 * 
 * @author Eridon Keta - 20044984.
 */

function Menu() {
    return (
        <Navbar className="Menu" bg="light" expand="lg">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>CHI PLAY 2021</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* LinkContainer is a component from react-router-bootstrap that wraps around the Nav.Link component 
            and adds the behavior of a regular <a> tag. It allows the user to navigate to the specified route */}
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/authors">
                            <Nav.Link>Authors</Nav.Link>
                        </LinkContainer>
                        {/* NavDropdown is a component from react-bootstrap that creates a dropdown menu for the "Papers" link */}
                        <LinkContainer to="/papers">
                            <NavDropdown title="Papers" id="basic-nav-dropdown">
                                <LinkContainer to="/papers">
                                    <NavDropdown.Item>All</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="papers/interactivity">
                                    <NavDropdown.Item>Interactivity</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="papers/fullpapers">
                                    <NavDropdown.Item>Fullpapers</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="papers/wip">
                                    <NavDropdown.Item>Wip</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="papers/competition">
                                    <NavDropdown.Item>Competition</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="papers/doctoral">
                                    <NavDropdown.Item>Doctoral</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="papers/rapid">
                                    <NavDropdown.Item>Rapid</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        </LinkContainer>
                        <LinkContainer to="/admin">
                            <Nav.Link>Admin</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;
