import { IoPaw } from "react-icons/io5";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import React from "react";
const Carrello = () => {
  return (
    <div className="sfondoCarrello ">
      <div className="d-flex justify-content-center align-items-center fw-bold mt-4 corsivo">
        <h2>Il carrello perfetto per una zampa felice</h2>
        <IoPaw className="fs-1 ruotato ms-2 mb-3" />
      </div>
      <Container className="text-normal ms-5 ">
        <Row className="border border-2">
          <Col xs={7} className="border border-2">
            PRODOTTI
          </Col>
          <Col xs={2}>PREZZO</Col>
          <Col xs={2}>Quantità</Col>
          <Col xs={1}>TOTALE</Col>
        </Row>
      </Container>
    </div>
  );
};
export default Carrello;
