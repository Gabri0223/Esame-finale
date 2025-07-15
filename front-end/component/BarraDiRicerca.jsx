import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import React from "react";

const BarraDiRicerca = () => {
  const [ricerca, setRicerca] = useState("");
  const [risultati, setRisultati] = useState([]);
  useEffect(() => {
    if (ricerca.trim() === "") {
      setRisultati([]);
      return;
    }
    fetch(`http://localhost:8080/cibo/search?query=${ricerca}`, {})
      .then((res) => {
        if (!res.ok) throw new Error("Errore durante la ricerca");
        return res.json();
      })
      .then((data) => {
        setRisultati(data.content);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [ricerca]);
  return (
    <div className="position-relative w-100 me-3 d-flex flex-column align-items-center">
      <div className="w-100 me-3 d-flex justify-content-center align-items-center ">
        <Form.Control
          type="text"
          placeholder="Cosa cerchi per il tuo amico peloso?"
          onChange={(e) => setRicerca(e.target.value)}
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} className="lente" />
      </div>
      {risultati.length > 0 && (
        <div className="contenitoreRisultati position-absolute w-100 bg-white shadow rounded">
          {risultati.map((item, index) => (
            <div key={index} className="p-2 bordor-bottom">
              {item.nome}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BarraDiRicerca;
