import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import LinkAccedi from "../component/LinkAccedi";
import BarraDiRicerca from "./BarraDiRicerca";
import IconaCarrello from "../component/IconaCarrello";
import React, { useEffect, useState } from "react";

const NavbarPrincipale = () => {
  const [carrelloUnito, setCarrelloUnito] = useState(false);

  if (!localStorage.getItem("carrello")) {
    localStorage.setItem("carrello", JSON.stringify([]));
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const carrello = JSON.parse(localStorage.getItem("carrello")) || [];

    if (token && carrello.length > 0 && !carrelloUnito) {
      const carrelloDaUnire = {
        elementiCarrelloDto: carrello.map((item) => ({
          prodottoId: item.prodotto.id,
          quantita: item.quantità,
        })),
      };
      console.log("carrelloDaUnire:", carrelloDaUnire);
      fetch("http://localhost:8080/Carrello/unisci", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(carrelloDaUnire),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Errore nell'unione del carrello");
          return res.json();
        })
        .then((data) => {
          localStorage.removeItem("carrello");
          setCarrelloUnito(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [carrelloUnito]);

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
              alt="zompettando.logo"
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
            <IconaCarrello />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarPrincipale;
