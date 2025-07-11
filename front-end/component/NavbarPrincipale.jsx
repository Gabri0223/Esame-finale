import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const NavbarPrincipale = () => {
  return (
    <Navbar expand="lg" className="navBar">
      <Container fluid>
        <div className="w-25 h-20 me-4">
          <Navbar.Brand href="#home" className=" d-flex justify-content-center">
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
            <div className="w-100 me-3 d-flex justify-content-center align-items-center ">
              <Form.Control
                type="text"
                placeholder="Cosa cerchi per il tuo amico peloso? "
              />
              <FontAwesomeIcon icon={faMagnifyingGlass} className="lente" />
            </div>
          </div>
          <div className="w-25 d-flex ms-5 align-items-center">
            <FontAwesomeIcon icon={faUser} className="utente" />
            <p className="accedi ms-1 my-0 me-4">Accedi o Registrati</p>
            <FontAwesomeIcon icon={faCartShopping} className="carrello ms-5" />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarPrincipale;
