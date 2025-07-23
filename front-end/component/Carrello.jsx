import { IoPaw } from "react-icons/io5";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BsExclamationTriangleFill } from "react-icons/bs";
import React from "react";

const Carrello = () => {
  const datiCarrello = JSON.parse(localStorage.getItem("carrello")) || [];
  const utente = localStorage.getItem("token");
  const navigate = useNavigate();
  const [carrello, setCarrello] = useState([]);
  const variazionePrezzo = { XS: -5.0, S: -2.0, M: 0, L: 2.0, XL: 5.0 };

  const incrementaQuantità = (index) => {
    const nuovoCarrello = [...carrello];
    nuovoCarrello[index].quantità += 1;
    setCarrello(nuovoCarrello);
    localStorage.setItem("carrello", JSON.stringify(nuovoCarrello));
  };

  useEffect(() => {
    setCarrello(datiCarrello);
    console.log("DEBUG CARRELLO:", datiCarrello);
  }, []);

  const diminuisciQuantità = (index) => {
    const nuovoCarrello = [...carrello];
    if (nuovoCarrello[index].quantità > 1) {
      nuovoCarrello[index].quantità -= 1;
      setCarrello(nuovoCarrello);
      localStorage.setItem("carrello", JSON.stringify(nuovoCarrello));
    }
  };

  const eliminaElemento = (index) => {
    const nuovoCarrello = carrello.filter((item, i) => i !== index);
    setCarrello(nuovoCarrello);
    localStorage.setItem("carrello", JSON.stringify(nuovoCarrello));
  };

  useEffect(() => {
    setCarrello(datiCarrello);
  }, []);

  return (
    <div className="sfondoCarrello">
      {carrello.length > 0 && (
        <>
          <div className="d-flex justify-content-center align-items-center fw-bold mt-4 corsivo">
            <h2>Il carrello perfetto per una zampa felice</h2>
            <IoPaw className="fs-1 ruotato ms-2 mb-3" />
          </div>

          <Container className="text-normal px-0 sfondoRosa fw-bold mt-3 ">
            <Row className=" mx-0 pt-2">
              <Col xs={5} className="ps-5">
                PRODOTTI
              </Col>
              <Col xs={2}>TAGLIA</Col>
              <Col xs={2}>PREZZO</Col>
              <Col xs={2}>Quantità</Col>
              <Col xs={1}>TOTALE</Col>
            </Row>

            <div className="contenitoreCarrello bordoSotto">
              {carrello.length > 0 &&
                carrello.map((item, index) => (
                  <Row
                    key={index}
                    className="d-flex align-items-center  px-2 mb-3 mt-2 "
                  >
                    <Col xs={5} className="d-flex align-items-center">
                      <MdOutlineCancel
                        className="me-3 fs-4"
                        onClick={() => {
                          eliminaElemento(index);
                        }}
                        style={{ cursor: "pointer" }}
                      />
                      <div className="contenitoreFotoImmagine">
                        <img
                          src={item.prodotto.immagineUrl}
                          alt=""
                          className="w-100"
                        />
                      </div>
                      <p className="fs-3 fw-bold m-0 ms-3 scrittaVerde">
                        {item.prodotto.nome}
                      </p>
                    </Col>
                    <Col xs={2}>
                      <p className="ps-4 m-0 scrittaVerde">
                        {item.prodotto.tagliaAttrezzatura}
                      </p>
                    </Col>
                    <Col xs={2}>
                      <p className="ps-3 m-0 scrittaVerde">
                        {(
                          item.prodotto.prezzo +
                          variazionePrezzo[item.prodotto.tagliaAttrezzatura]
                        ).toFixed(2)}
                        €
                      </p>
                    </Col>
                    <Col xs={2}>
                      <div className="d-flex align-items-center ">
                        {item.quantità === 1 && (
                          <div className=" border border-2 border-secondary rounded-start aggiungiETogli  bg-secondary-subtle text-white">
                            <p className="m-0 p-1 px-2">-</p>
                          </div>
                        )}
                        {item.quantità > 1 && (
                          <div
                            className=" bordiVerdi rounded-start aggiungiETogli"
                            onClick={() => {
                              diminuisciQuantità(index);
                            }}
                          >
                            <p className="m-0 p-1 px-2">-</p>
                          </div>
                        )}

                        <div className="bordiVerdi">
                          <p className="m-0 p-1 px-2 scrittaVerde">
                            {item.quantità}
                          </p>
                        </div>

                        <div
                          className=" bordiVerdi rounded-end me-5 aggiungiETogli"
                          onClick={() => {
                            incrementaQuantità(index);
                          }}
                        >
                          <p className="m-0  p-1 px-2"> + </p>
                        </div>
                      </div>
                    </Col>
                    <Col xs={1} className="">
                      <p className="ps-3 m-0 scrittaVerde">
                        {(
                          (item.prodotto.prezzo +
                            variazionePrezzo[
                              item.prodotto.tagliaAttrezzatura
                            ]) *
                          item.quantità
                        ).toFixed(2)}
                        €
                      </p>
                    </Col>
                  </Row>
                ))}
            </div>
            <Row>
              <Col xs={6}>
                <div>
                  <p className="mt-3 ms-3 fw-bold mb-0 fs-4">
                    Codice promozionale
                  </p>
                  <InputGroup className="ms-3 mt-3 mb-4 w-100">
                    <Form.Control
                      placeholder="Codice Coupon"
                      className=" w-50"
                    />
                    <Button className="rounded-pill w-25 ms-2 me-5">
                      INVIA COUPON
                    </Button>
                  </InputGroup>
                </div>
              </Col>
              <Col xs={6}>
                <div className="mt-3 ms-3">
                  <p className="fs-4">Totale Carrello</p>
                  <div className="d-flex justify-content-between bg-secondary-subtle align-items-center border border-2 border-secondary-subtle me-3">
                    <p className="fs-5 m-0 py-2 ps-3">Subtotale</p>
                    <p className="me-4 mb-0 fs-5">
                      {carrello
                        .reduce((acc, item) => {
                          const variazione =
                            variazionePrezzo[item.tagliaAttrezzatura] || 0;
                          const prezzoFinale =
                            item.prodotto.prezzo + variazione;
                          return acc + prezzoFinale * item.quantità;
                        }, 0)
                        .toFixed(2)}
                      €
                    </p>
                  </div>
                  <div className="d-flex justify-content-between bg-secondary-subtle align-items-center mb-3 border border-2 border-secondary-subtle me-3">
                    <p className="fs-5 m-0 py-2 ps-3">Totale</p>
                    <p className="me-4 mb-0 fs-5">
                      {carrello
                        .reduce((acc, item) => {
                          const variazione =
                            variazionePrezzo[item.tagliaAttrezzatura] || 0;
                          const prezzoFinale =
                            item.prodotto.prezzo + variazione;
                          return acc + prezzoFinale * item.quantità;
                        }, 0)
                        .toFixed(2)}
                      €
                    </p>
                  </div>
                  {utente === null && (
                    <div className="d-flex align-items-end flex-column ">
                      <div className="d-flex w-50 justify-content-center align-items-center text-danger">
                        <small className="me-3">
                          <BsExclamationTriangleFill className="mb-1" />
                          Devi essere loggato per pagare
                        </small>
                      </div>
                      <Button className="rounded-pill bottoneGrigio mb-3 me-3 w-50">
                        Procedi al pagamento
                      </Button>
                    </div>
                  )}
                  {utente !== null && (
                    <div className="d-flex justify-content-end ">
                      <Button className="rounded-pill mb-3 me-3 w-50">
                        Procedi al pagamento
                      </Button>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        </>
      )}
      {carrello.length === 0 && (
        <div className="d-flex align-items-center flex-column mt-5">
          <div className="contenitoreFotoCarrelloVuoto ">
            <img
              src="../src/assets/Nala2.jpeg "
              alt=""
              className="w-100 rounded-circle"
            />
          </div>
          <p className="fs-2 fw-bold">
            Il tuo carrello è vuoto inizia lo shopping!
          </p>
          <Button
            className="w-25"
            variant="warning"
            onClick={() => navigate("/")}
          >
            Vai alla home
          </Button>
        </div>
      )}
    </div>
  );
};
export default Carrello;
