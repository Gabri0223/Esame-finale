import { IoPaw } from "react-icons/io5";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useState, useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BsExclamationTriangleFill } from "react-icons/bs";
import BottonePagamento from "../component/BottonePagamento";
import CodiceSconto from "../component/CodiceSconto";
import React from "react";

const Carrello = () => {
  const token = localStorage.getItem("token") || null;
  const navigate = useNavigate();
  const [carrello, setCarrello] = useState([]);
  const [scontoValido, setScontoValido] = useState(false);
  const [datiCodice, setDatiCodice] = useState(null);
  const [cliccato, setCliccato] = useState(false);
  const click = () => setCliccato((prev) => !prev);
  let costiSpedizione = 6.5;
  const variazionePrezzo = { XS: -5.0, S: -2.0, M: 0, L: 2.0, XL: 5.0 };

  useEffect(() => {
    if (token) {
      fetch("http://localhost:8080/Carrello/daToken", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Errore nella visualizazione del carrello");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setCarrello(data.elementiCarrello || []);
        })
        .catch((err) => {
          console.error(err.message);
        });
    } else {
      const datiLocalStorage =
        JSON.parse(localStorage.getItem("carrello")) || [];
      setCarrello(datiLocalStorage);
    }
  }, []);

  const calcoloSubTotale = () => {
    const subtotale = carrello
      .reduce((totale, item) => {
        const variazione =
          variazionePrezzo[item.tagliaAttrezzatura] ||
          variazionePrezzo[item.taglia] ||
          0;
        const prezzoFinale = item.prodotto.prezzo + variazione;
        return totale + prezzoFinale * (item.quantità || item.quantita);
      }, 0)
      .toFixed(2);
    if (subtotale > 30) {
      costiSpedizione = 0;
    }
    return subtotale;
  };

  const incrementaQuantità = (index) => {
    if (token) {
      const nuovoCarrello = [...carrello];
      nuovoCarrello[index].quantita += 1;
      setCarrello(nuovoCarrello);
      console.log(nuovoCarrello[index].quantita);
      fetch(
        `http://localhost:8080/elementi/${nuovoCarrello[index].id}?nuovaQuantita=${nuovoCarrello[index].quantita}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("Errore aumento quantità backend");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      const nuovoCarrello = [...carrello];
      nuovoCarrello[index].quantità += 1;
      setCarrello(nuovoCarrello);
      localStorage.setItem("carrello", JSON.stringify(nuovoCarrello));
    }
  };

  const diminuisciQuantità = (index) => {
    const nuovoCarrello = [...carrello];

    if (token) {
      nuovoCarrello[index].quantita -= 1;
      setCarrello(nuovoCarrello);
      fetch(
        `http://localhost:8080/elementi/${nuovoCarrello[index].id}?nuovaQuantita=${nuovoCarrello[index].quantita}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("Errore aumento quantità backend");
          }
          return res.json;
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      nuovoCarrello[index].quantità -= 1;
      setCarrello(nuovoCarrello);
      localStorage.setItem("carrello", JSON.stringify(nuovoCarrello));
    }
  };

  const eliminaElementoBackend = (item) => {
    console.log(item);
    return fetch(`http://localhost:8080/elementi/${item.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const eliminaElemento = (index) => {
    const item = carrello[index];
    const nuovoCarrello = carrello.filter((elemento, i) => i !== index);
    setCarrello(nuovoCarrello);

    if (token) {
      eliminaElementoBackend(item);
    } else {
      localStorage.setItem("carrello", JSON.stringify(nuovoCarrello));
    }
  };

  const gestisciValidazione = (risultato) => {
    setScontoValido(risultato.valido);
    setDatiCodice(risultato.codiceSconto);
  };

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
                        {item.prodotto.tagliaAttrezzatura || item.taglia}
                      </p>
                    </Col>
                    <Col xs={2}>
                      {token === null && (
                        <p className=" m-0 scrittaVerde">
                          {(
                            item.prodotto.prezzo +
                            variazionePrezzo[item.prodotto.tagliaAttrezzatura]
                          ).toFixed(2)}
                          €
                        </p>
                      )}
                      {token !== null && (
                        <p className=" m-0 scrittaVerde">
                          {(
                            item.prodotto.prezzo + variazionePrezzo[item.taglia]
                          ).toFixed(2)}
                          €
                        </p>
                      )}
                    </Col>
                    <Col xs={2}>
                      <div className="d-flex align-items-center ">
                        {(item.quantità === 1 || item.quantita === 1) && (
                          <div className=" border border-2 border-secondary rounded-start aggiungiETogli  bg-secondary-subtle text-white">
                            <p className="m-0 p-1 px-2">-</p>
                          </div>
                        )}
                        {(item.quantità > 1 || item.quantita > 1) && (
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
                            {item.quantità || item.quantita}
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
                      {token === null && (
                        <p className=" m-0 scrittaVerde">
                          {(
                            (item.prodotto.prezzo +
                              variazionePrezzo[
                                item.prodotto.tagliaAttrezzatura
                              ]) *
                            item.quantità
                          ).toFixed(2)}
                          €
                        </p>
                      )}
                      {token !== null && (
                        <p className="m-0 scrittaVerde">
                          {(
                            (item.prodotto.prezzo +
                              variazionePrezzo[item.taglia]) *
                            item.quantita
                          ).toFixed(2)}
                          €
                        </p>
                      )}
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
                  {!token && (
                    <InputGroup className="ms-3 mt-3 mb-4 w-100 d-flex flex-column">
                      <div className="d-flex w-100">
                        <Form.Control
                          placeholder="Codice Coupon"
                          className=" w-50"
                          onChange={(e) => {
                            setCodice(e.target.value);
                          }}
                          onClick={() => {
                            click();
                          }}
                        />
                        <Button className="rounded-pill w-25 ms-2 me-5 bottoneGrigio">
                          INVIA COUPON
                        </Button>
                      </div>
                      {cliccato && (
                        <Alert
                          variant="danger"
                          className="mb-0 pb-2 pt-1 rounded w-50 text-center"
                        >
                          <small>
                            devi essere loggato per inserire un coupon
                          </small>
                        </Alert>
                      )}
                    </InputGroup>
                  )}
                  {token && (
                    <CodiceSconto onValidazione={gestisciValidazione} />
                  )}
                </div>
              </Col>
              <Col xs={6}>
                <div className="mt-3 ms-3">
                  <p className="fs-4">Totale Carrello</p>
                  <div className=" bg-secondary-subtle border border-2 border-secondary-subtle me-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="fs-5 m-0 py-2 ps-3">Subtotale</p>
                      <p className="me-4 mb-0 fs-5">{calcoloSubTotale()}€</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ms-3">
                      <small className="piùPiccolo">Costo spedizione</small>
                      <p className="p-6 m-0 pe-4">{costiSpedizione}€</p>
                    </div>
                    {scontoValido && (
                      <div className="d-flex justify-content-between align-items-center ms-3">
                        <small className="piùPiccolo">sconto applicato:</small>
                        <p className="p-6 m-0 pe-4">
                          {datiCodice.percentuale}%
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="d-flex justify-content-between bg-secondary-subtle align-items-center mb-3 border border-2 border-secondary-subtle me-3">
                    <p className="fs-5 m-0 py-2 ps-3">Totale</p>
                    <p className="me-4 mb-0 fs-5">
                      {carrello
                        .reduce((totale, item) => {
                          let sconto;
                          if (datiCodice && datiCodice.percentuale) {
                            sconto = datiCodice.percentuale / 100;
                          } else {
                            sconto = 1;
                          }
                          const variazione =
                            variazionePrezzo[item.tagliaAttrezzatura] ||
                            variazionePrezzo[item.taglia] ||
                            0;
                          const prezzoFinale =
                            item.prodotto.prezzo + variazione;

                          return (
                            totale +
                            (prezzoFinale * (item.quantità || item.quantita) +
                              costiSpedizione) *
                              (1 - sconto)
                          );
                        }, 0)
                        .toFixed(2)}
                      €
                    </p>
                  </div>
                  {token === null && (
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
                  {token !== null && <BottonePagamento />}
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
