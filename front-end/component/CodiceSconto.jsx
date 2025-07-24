import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
const CodiceSconto = ({ onValidazione }) => {
  const [codice, setCodice] = useState("");
  const validaCodiceSconto = () => {
    fetch(
      `http://localhost:8080/codiceSconto/verifica?codiceSconto=${codice}`,
      {}
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Errore durante la verifica");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        onValidazione(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <InputGroup className="ms-3 mt-3 mb-4 w-100">
      <Form.Control
        placeholder="Codice Coupon"
        className=" w-50"
        onChange={(e) => {
          setCodice(e.target.value);
        }}
      />
      <Button
        className="rounded-pill w-25 ms-2 me-5"
        onClick={validaCodiceSconto}
      >
        INVIA COUPON
      </Button>
    </InputGroup>
  );
};
export default CodiceSconto;
