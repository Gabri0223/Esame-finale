import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import LinkAccedi from "../component/LinkAccedi";
import BarraDiRicerca from "./BarraDiRicerca";

const NavbarPrincipale = () => {
  return (
    <Navbar expand="lg" className="navBar">
      <Container fluid>
        <div className="w-25 h-20 me-4">
          <Navbar.Brand href="/" className=" d-flex justify-content-center">
            <div className="d-flex align-items-center justify-content-around corsivo pe-3">
              <p className="p-0 m-0 fs-2">Zompettando</p>
            </div>
            <img
              className="w-25 "
              src="https://www.zampettando.net/wp-content/uploads/2020/12/cropped-zampettando-blog-logo.png"
              alt="Arcaplanet.logo"
            />
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="d-flex align-items-center cerca">
            <BarraDiRicerca />
          </div>
          <div className="w-25 d-flex ms-5 align-items-center">
            <LinkAccedi />
            <FontAwesomeIcon icon={faCartShopping} className="carrello ms-5" />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarPrincipale;
