import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";

const InformazioniUtente = ({ onChangeDatiUtente }) => {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [dettagliAggiuntivi, setDettagliAggiuntivi] = useState("");

  useEffect(() => {
    onChangeDatiUtente({
      nome,
      cognome,
      email,
      dettagliAggiuntivi,
    });
  }, [nome, cognome, email, dettagliAggiuntivi]);

  return (
    <div>
      <Form.Group>
        <Form.Label className="m-0 ">Nome*</Form.Label>
        <Form.Control
          required
          placeholder="Inserisci il tuo nome"
          className="bordiRosa w-100"
          onChange={(e) => {
            setNome(e.target.value);
          }}
        />
        <Form.Label className="m-0 mt-2">Cognome*</Form.Label>
        <Form.Control
          required
          placeholder="Inserisci il tuo nome"
          className="bordiRosa w-100"
          onChange={(e) => {
            setCognome(e.target.value);
          }}
        />
        <Form.Label className="m-0 mt-2">Email*</Form.Label>
        <Form.Control
          required
          placeholder="Inserisci il tuo nome"
          className="bordiRosa w-100"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <Form.Label className="m-0 mt-2">Dettagli aggiuntivi*</Form.Label>
        <Form.Control
          placeholder="Inserisci il tuo nome"
          className="bordiRosa w-100 py-3 px-3"
          onChange={(e) => {
            setDettagliAggiuntivi(e.target.value);
          }}
        />
      </Form.Group>
    </div>
  );
};

export default InformazioniUtente;
