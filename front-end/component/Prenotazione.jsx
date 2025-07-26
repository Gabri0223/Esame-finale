import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { HiOutlineX } from "react-icons/hi";
import Calendario from "./Calendario";
import React, { useState } from "react";

const Prenotazione = () => {
  const [dataSelezionata, setDataSelezionata] = useState(null);
  const handlerCambiamentoData = (data) => {
    setDataSelezionata(data);
  };
  return (
    <div className="overlay-dark">
      <Container className="border mt-5 focus-element rounded contenitorePrenotazione">
        <Row className="sfondoRosa justify-content-end d-flex">
          <Col>
            <p className="text-end m-0 p-2 fw-bolder fs-3">
              {" "}
              <HiOutlineX />
            </p>
          </Col>
        </Row>
        <Row className="border">
          <Col xs={6} className="border">
            <p className="fw-bold fs-4 text-center my-auto py-3">
              Selezione una data
            </p>
          </Col>
          <Col>
            {dataSelezionata != null && (
              <p className="fw-bold fs-4 text-center my-auto py-3">
                {" "}
                Seleziona una fascia oraria per il: {dataSelezionata.getDate()}/
                {dataSelezionata.getMonth() + 1}/{dataSelezionata.getFullYear()}
              </p>
            )}
          </Col>
        </Row>
        <Row>
          <Col xs={6} className="border">
            <Calendario onDateChange={handlerCambiamentoData} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Prenotazione;
