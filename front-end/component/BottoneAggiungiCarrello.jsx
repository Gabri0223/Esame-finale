import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import React from "react";

const BottoneAggiungiCarrello = ({ prodotto, quantità }) => {
  const [carrello, setCarrello] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const carrelloSalvato = JSON.parse(localStorage.getItem("carrello")) || [];
    setCarrello(carrelloSalvato);
  }, []);

  const aggiungiProdotto = () => {
    const esiste = carrello.find(
      (item) =>
        item.prodotto.id === prodotto.id &&
        item.prodotto.tagliaAttrezzatura === prodotto.tagliaAttrezzatura
    );
    let nuovoCarrello;
    if (esiste) {
      nuovoCarrello = carrello.map((item) => {
        if (item.prodotto.id === prodotto.id) {
          return { ...item, quantità: item.quantità + 1 };
        } else {
          return item;
        }
      });
    } else {
      nuovoCarrello = [...carrello, { prodotto, quantità }];
    }

    setCarrello(nuovoCarrello);
    localStorage.setItem("carrello", JSON.stringify(nuovoCarrello));
  };

  const aggiungiAlCarrello = () => {
    fetch("http://localhost:8080/elementi", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.trim()}`,
      },
      body: JSON.stringify({
        prodottoId: prodotto.id,
        quantita: quantità,
        taglia: prodotto.tagliaAttrezzatura,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Errore durante l'aggiunta al carrello");
        }
        return res.json();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <Button
      className="bottoneRosa mb-2 btn btn-primary"
      onClick={() => {
        if (token) {
          aggiungiAlCarrello();
        } else {
          aggiungiProdotto();
        }
      }}
    >
      Aggiungi al carrello
    </Button>
  );
};

export default BottoneAggiungiCarrello;
