import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
const Menu = () => {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: "100px" }}
                            navbarScroll
                        >
                            <Nav.Link href="#action1">Home</Nav.Link>
                            <NavDropdown title="Clubs" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/clubs/add">
                                    Créer un nouveau club
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/clubs">
                                    Liste des clubs
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Joueurs" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/players/add">
                                    Créer un nouveau joueur
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/players">
                                    Liste des joueurs
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};
export default Menu;