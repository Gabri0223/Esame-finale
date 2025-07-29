import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { HiOutlineX } from "react-icons/hi";
import { FaArrowLeftLong } from "react-icons/fa6";
import Calendario from "./Calendario";
import Orari from "./Orari";
import Taglia from "./Taglia";
import InformazioniUtente from "./InformazioniUtente";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Prenotazione = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const specialista = queryParams.get("specialista").toUpperCase();
  const [dataSelezionata, setDataSelezionata] = useState(null);
  const [fasciaOraria, setFasciaOraria] = useState(null);
  const [animazioneAttiva, setAnimazioneAttiva] = useState(false);
  const [calendarioNascosto, setCalendarioNascosto] = useState(false);
  const [taglia, setTaglia] = useState("");
  const [orariNascosti, setOrariNascosti] = useState(false);
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [dettagliAggiuntivi, setDettagliAggiuntivi] = useState("");
  const [consenso, setConsenso] = useState(false);
  const [faiAnimazione, setFaiAnimazione] = useState(true);
  const token = localStorage.getItem("token");
  const tuttiCompilati =
    dataSelezionata && fasciaOraria && taglia && nome && cognome && email;

  const handlerCambiamentoData = (data) => {
    setDataSelezionata(data);
  };

  const handlerSelezioneOrario = (fasciaOraria) => {
    setFasciaOraria(fasciaOraria);
    setAnimazioneAttiva(true);
    setCalendarioNascosto(true);
  };

  const handlerSelezioneTaglia = (taglia) => {
    setTaglia(taglia);
    setOrariNascosti(true);
    setFaiAnimazione(true);
  };

  const handlerCambiamentoDati = (dati) => {
    setNome(dati.nome);
    setCognome(dati.cognome);
    setEmail(dati.email);
    setDettagliAggiuntivi(dati.dettagliAggiuntivi);
  };

  const salvaPrenotazione = () => {
    fetch(`http://localhost:8080/prenotazione/${specialista}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.trim()}`,
      },
      body: JSON.stringify({
        dataPrenotazione: dataSelezionata.toISOString().split("T")[0],
        tagliaCane: taglia,
        nome: nome,
        cognome: cognome,
        email: email,
        fasciaOraria: `${fasciaOraria.inizio}-${fasciaOraria.fine}`,
        dettagliAggiuntivi: dettagliAggiuntivi,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Errore durante la prenotazione");
        }
        return res.json();
      })
      .then((data) => {
        alert("Prenotazione effettuata con successo!");
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="overlay-dark">
      <Container className="border mt-5 focus-element rounded contenitorePrenotazione">
        <Row className="sfondoRosa">
          <Col className="justify-content-between d-flex">
            <p
              className="m-0 p-2 fs-3 cliccabile"
              onClick={() => {
                if (orariNascosti) {
                  setOrariNascosti(false);
                  setFaiAnimazione(false);
                } else {
                  setAnimazioneAttiva(false);
                  setCalendarioNascosto(false);
                  setFaiAnimazione(true);
                }
              }}
            >
              <FaArrowLeftLong />
            </p>
            <p className="text-end m-0 p-2 fw-bolder fs-3">
              <HiOutlineX
                className="cliccabile"
                onClick={() => {
                  navigate("/");
                }}
              />
            </p>
          </Col>
        </Row>
        <Row className="border contenitoreInformazioni">
          <Col xs={6} className={`p-0 border ${animazioneAttiva ? "box" : ""}`}>
            <p className="fw-bold fs-4 text-center my-auto py-3">
              Selezione una data
            </p>
          </Col>

          <Col
            xs={6}
            className={` p-0 border ${
              !faiAnimazione
                ? "box7"
                : orariNascosti
                ? "box4"
                : animazioneAttiva
                ? "box2"
                : ""
            } `}
          >
            {dataSelezionata != null && (
              <>
                <p className="fw-bold fs-4 text-center my-auto py-3 ">
                  {" "}
                  Seleziona una fascia oraria per il:{" "}
                  {dataSelezionata.getDate()}/{dataSelezionata.getMonth() + 1}/
                  {dataSelezionata.getFullYear()}
                </p>
              </>
            )}
          </Col>
          {calendarioNascosto && (
            <Col
              xs={6}
              className={` ${
                !faiAnimazione
                  ? "box6"
                  : orariNascosti
                  ? "box5 border border-start-0"
                  : "box3"
              }`}
            >
              <p className="fw-bold fs-4 text-center my-auto py-3">
                Seleziona un servizio
              </p>
            </Col>
          )}
          {orariNascosti && (
            <Col xs={6} className="box3">
              <p className="fw-bold fs-4 text-center my-auto py-3">
                Inserisci i tuoi dati
              </p>
            </Col>
          )}
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
            <Col
              xs={6}
              className={`p-0 border border-bottom-0 border-top-0 ${
                !faiAnimazione
                  ? "box7"
                  : orariNascosti
                  ? "box4"
                  : animazioneAttiva
                  ? "box2"
                  : ""
              } `}
            >
              <Orari onSelezioneOrario={handlerSelezioneOrario} />
            </Col>
          )}
          {calendarioNascosto && (
            <Col
              xs={6}
              className={` p-0 ${
                !faiAnimazione ? "box6" : orariNascosti ? "box5" : "box3"
              }`}
            >
              <Taglia onSelezioneTaglia={handlerSelezioneTaglia} />
            </Col>
          )}
          {orariNascosti && (
            <Col xs={6} className="box3">
              {" "}
              <InformazioniUtente onChangeDatiUtente={handlerCambiamentoDati} />
              <div
                className="d-flex align-items-center justify-content-between mt-3"
                style={{ cursor: "pointer" }}
              >
                <Form.Check
                  className="cliccabile"
                  type={"checkbox"}
                  id={`default-checkbox`}
                  label={`Accetto termini e condizioni`}
                  checked={consenso}
                  onChange={(e) => setConsenso(e.target.checked)}
                />
                <Button
                  className={
                    tuttiCompilati && consenso ? "bottoneRosa" : "bottoneGrigio"
                  }
                  disabled={!tuttiCompilati || !consenso}
                  onClick={() => {
                    salvaPrenotazione();
                  }}
                >
                  Conferma la prenotazione
                </Button>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};
export default Prenotazione;
