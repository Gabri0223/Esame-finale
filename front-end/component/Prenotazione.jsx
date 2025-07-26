import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { HiOutlineX } from "react-icons/hi";
import Calendario from "./Calendario";
import Orari from "./Orari";
import { FaArrowLeftLong } from "react-icons/fa6";
import React, { useState } from "react";

const Prenotazione = () => {
  const [dataSelezionata, setDataSelezionata] = useState(null);
  const [fasciaOraria, setFasciaOraria] = useState(null);
  const [animazioneAttiva, setAnimazioneAttiva] = useState(false);

  const handlerCambiamentoData = (data) => {
    setDataSelezionata(data);
  };

  const handlerSelezioneOrario = (fasciaOraria) => {
    setFasciaOraria(fasciaOraria);
    setAnimazioneAttiva(true);
  };

  return (
    <div className="overlay-dark">
      <Container className="border mt-5 focus-element rounded contenitorePrenotazione">
        <Row className="sfondoRosa">
          <Col className="justify-content-between d-flex">
            <p
              className="m-0 p-2 fs-3 cliccabile"
              onClick={() => {
                setAnimazioneAttiva(false);
              }}
            >
              <FaArrowLeftLong />
            </p>
            <p className="text-end m-0 p-2 fw-bolder fs-3">
              {" "}
              <HiOutlineX />
            </p>
          </Col>
        </Row>
        <Row className="border contenitoreInformazioni">
          <Col xs={6} className={`border ${animazioneAttiva ? "box" : ""}`}>
            <p className="fw-bold fs-4 text-center my-auto py-3">
              Selezione una data
            </p>
          </Col>
          <Col xs={6} className={`border ${animazioneAttiva ? "box2" : ""}`}>
            {dataSelezionata != null && (
              <>
                <p className="fw-bold fs-4 text-center my-auto py-3">
                  {" "}
                  Seleziona una fascia oraria per il:{" "}
                  {dataSelezionata.getDate()}/{dataSelezionata.getMonth() + 1}/
                  {dataSelezionata.getFullYear()}
                </p>
              </>
            )}
          </Col>
        </Row>
        <Row className="contenitoreInformazioni ">
          <Col
            xs={6}
            className={`border border-bottom-0 p-0 ${
              animazioneAttiva ? "box" : ""
            }`}
          >
            <Calendario onDateChange={handlerCambiamentoData} />
          </Col>
          {dataSelezionata != null && (
            <Col xs={6} className={` p-0 ${animazioneAttiva ? "box2" : ""}`}>
              <Orari onSelezioneOrario={handlerSelezioneOrario} />
            </Col>
          )}
          <Col
            xs={6}
            className={` p-0 ${animazioneAttiva ? "box2" : ""}`}
          ></Col>
        </Row>
      </Container>
    </div>
  );
};
export default Prenotazione;
