import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const BarraFiltri = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const [ordinamento, setOrdinamento] = useState("rilevanza");
  const [risultati, setRisultati] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [RaggiuntoMassimo, setRaggiuntoMassimo] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!keyword) return;
    fetch(
      `http://localhost:8080/ricerca?keyword=${keyword}&sort=${ordinamento}&page=${pagina}&size=15`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Errore durante la ricerca");
        }
        return res.json();
      })
      .then((data) => {
        if (data.length === 0 && pagina > 0) {
          setRaggiuntoMassimo(true);
          setPagina(pagina - 1);
          setRisultati(data);
        } else {
          setRisultati(data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [keyword, ordinamento, pagina]);
  return (
    <div className="sfondoGrigio">
      <p className="fs-2 pt-4 ps-4 sfondoGrigio m-0 mb-2">
        Risultati per: <span className="fw-bolder"> {keyword}</span>
      </p>
      <Container fluid className="sfondoGrigio">
        <Row>
          <div className="d-flex w-100 bg-white align-items-center mb-3">
            <Col xs={3}>
              <div className="d-flex align-items-center">
                <p className="fs-5 m-0 py-2 ms-3 text-black">Ordina per:</p>
                <Dropdown className="py-2">
                  <Dropdown.Toggle className="ordineDropDown ms-2 p-1 px-2  d-flex align-items-center">
                    {ordinamento === "rilevanza" && "Rilevanza"}
                    {ordinamento === "prezzo_asc" && "Prezzo Crescente"}
                    {ordinamento === "prezzo_desc" && "Prezzo Decrescente"}
                    {ordinamento === "nome_asc" && "Nome A-Z"}
                    {ordinamento === "nome_desc" && "Nome Z-A"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setOrdinamento("rilevanza")}>
                      Rilevanza
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setOrdinamento("prezzo_asc")}>
                      Prezzo Crescente
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setOrdinamento("prezzo_desc")}
                    >
                      Prezzo Decrescente
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setOrdinamento("nome_asc")}>
                      Nome A-Z
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setOrdinamento("nome_desc")}>
                      Nome Z-A
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Col>

            <Col>
              <div className="d-flex justify-content-center my-4">
                <Button
                  variant="secondary"
                  className="me-2"
                  onClick={() =>
                    setPagina(
                      (prev) => Math.max(prev - 1, 0),
                      setRaggiuntoMassimo(false)
                    )
                  }
                  disabled={pagina === 0}
                >
                  <p className="m-0">{"<"}</p>
                </Button>
                <span className="align-self-center">Pagina {pagina + 1}</span>
                {!RaggiuntoMassimo && (
                  <Button
                    variant="secondary"
                    className="ms-2"
                    onClick={() => setPagina((prev) => prev + 1)}
                  >
                    <p className="m-0"> {">"}</p>
                  </Button>
                )}
              </div>
            </Col>
            <Col xs={3}></Col>
          </div>
        </Row>
        <Row>
          {risultati.map((item) => (
            <Col key={item.prodotto.id} xs={2}>
              <Card className="my-2">
                <Link to={`/dettagli/${item.prodotto.id}`}>
                  <Card.Img variant="top" src={item.prodotto.immagineUrl} />
                </Link>
                <Card.Body>
                  <Card.Title>{item.prodotto.nome}</Card.Title>
                  <Card.Text>
                    <span className="fw-bold pe-2">Marca:</span>
                    {item.prodotto.marca}
                    <br />
                    <span className="fw-bold pe-2">Prodotto:</span>
                    {item.prodotto.tipoProdotto.toLowerCase()}
                  </Card.Text>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0 fw-bold fs-5 me-2">
                      {item.prodotto.prezzo} $
                    </p>

                    <Button
                      className="rounded w-50"
                      onClick={() => {
                        navigate(`/dettagli/${item.prodotto.id}`);
                      }}
                    >
                      Dettagli
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Row></Row>
      </Container>
    </div>
  );
};

export default BarraFiltri;
