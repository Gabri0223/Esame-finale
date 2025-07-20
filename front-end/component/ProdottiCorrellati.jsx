import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const ProdottiCorrelati = ({ prodottoId, tipoAnimale }) => {
  const ricerca = tipoAnimale;
  const [risultati, setRisultati] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const urls = [
      `http://localhost:8080/cibo/search?query=${ricerca}`,
      `http://localhost:8080/attrezzatura/search?query=${ricerca}`,
      `http://localhost:8080/giochi/search?query=${ricerca}`,
    ];

    Promise.all(
      urls.map((url) =>
        fetch(url).then((res) => {
          if (!res.ok) throw new Error("Errore durante la ricerca");
          return res.json();
        })
      )
    )
      .then((results) => {
        const tuttiIRisultati = results.flatMap((data) => data.content);
        const filtrati = tuttiIRisultati.filter(
          (prodotto) => prodotto.id !== prodottoId
        );
        setRisultati(filtrati);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [prodottoId]);

  return (
    <div className="mt-2 ms-5 p-3 d-flex flex-wrap gap-3">
      {risultati.length === 0 ? (
        <p>Nessun prodotto correlato trovato.</p>
      ) : (
        risultati.map((prodotto) => (
          <Card key={prodotto.id} style={{ width: "16%", marginRight: "2%" }}>
            <Card.Img
              variant="top"
              src={prodotto.immagineUrl}
              className="h-50"
            />
            <Card.Body>
              <Card.Title>{prodotto.nome}</Card.Title>
              <Card.Text>
                Marca: <span className="fw-bold">{prodotto.marca}</span>
                <br />
                Tipo:
                <span className="fw-bold">
                  {(
                    prodotto.tipoCibo ||
                    prodotto.tipoGiochi ||
                    prodotto.tipoAttrezzatura ||
                    "N/A"
                  ).toLowerCase()}
                </span>
                <br />
                Prezzo:<span className="fw-bold">{prodotto.prezzo}</span>
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => navigate(`/dettagli/${prodotto.id}`)}
              >
                Dettagli
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default ProdottiCorrelati;
