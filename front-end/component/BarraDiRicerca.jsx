import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import { useState, useEffect, useRef } from "react";
import React from "react";

const BarraDiRicerca = () => {
  const [ricerca, setRicerca] = useState("");
  const [risultati, setRisultati] = useState([]);
  const [cliccato, setCliccato] = useState(false);
  const click = () => setCliccato((prev) => !prev);
  const [mostraNessunRisultato, setMostraNessunRisultato] = useState(false);
  const barraRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (barraRef.current && !barraRef.current.contains(event.target)) {
        setCliccato(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (ricerca.length > 0 && risultati.length === 0) {
        setMostraNessunRisultato(true);
      } else {
        setMostraNessunRisultato(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [ricerca, risultati]);

  useEffect(() => {
    if (ricerca.trim() === "") {
      setRisultati([]);
      return;
    }

    fetch(`http://localhost:8080/cibo/search?query=${ricerca}`, {})
      .then((res) => {
        if (!res.ok) throw new Error("Errore durante la ricerca");
      })
      .then((data) => {
        setRisultati(data.content);
        fetch(`http://localhost:8080/attrezzatura/search?query=${ricerca}`, {})
          .then((res) => {
            if (!res.ok) throw new Error("Errore durante  la ricerca");
            return res.json();
          })
          .then((data) => {
            setRisultati((prev) => [...prev, ...data.content]);
          });
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
          onClick={click}
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} className="lente" />
      </div>
      {risultati.length === 0 && cliccato === true && ricerca.length === 0 && (
        <div
          className="contenitoreRisultati position-absolute w-100 shadow rounded pt-2"
          ref={barraRef}
        >
          <div className="d-flex ">
            <div>
              <small className="m-2 pt-3 fw-bold">
                PIÙ CERCATI IN QUESTO MOMENTO
              </small>
              <div className="text-black ms-2 mt-2 fw-bold">
                <p className="mb-1">Cibo Per Gatti</p>
                <p className="mb-1">Crocchette Per Cani</p>
                <p className="mb-1">Trasportino</p>
                <p className="mb-1">Seresto Collare Antiparassitario</p>
                <p className="mb-1">Cibo Secco Per Gatti</p>
                <p className="mb-1">Guinzagli per cani</p>
              </div>
            </div>
            <img
              src="../src/assets/cagnolino.png"
              alt=""
              className="w-50 mx-auto"
            />
          </div>
        </div>
      )}
      {risultati.length > 0 && cliccato === true && (
        <div
          className="contenitoreRisultati position-absolute w-100 bg-white shadow rounded d-flex"
          ref={barraRef}
        >
          <div className=" contenitoreProdotti">
            <p className="m-2 text-black">
              {" "}
              Risultati per <span className=" fw-bold">{ricerca}</span>
            </p>
            {risultati.map((item, index) => (
              <div
                key={index}
                className="p-2 bordor-bottom d-flex align-items-center"
              >
                <div className="contenitoreFotoProdotto">
                  <img
                    className="w-100 h-100"
                    src={item.immagineUrl}
                    alt="immagine ricerca"
                  />
                </div>
                <p className="text-black mb-0 ms-2 fw-bold">{item.nome}</p>
              </div>
            ))}
          </div>
          <div className="w-50 mx-auto">
            <img src="../src/assets/cagnolino.png" alt="" className="w-100" />
          </div>
        </div>
      )}
      {mostraNessunRisultato && cliccato === true && (
        <div
          className="contenitoreRisultati position-absolute w-100 bg-white shadow rounded"
          ref={barraRef}
        >
          <div className="d-flex align-items-center">
            <p className="text-black fs-2 ms-3">
              Nessun risultato per <span className="fw-bold">{ricerca}</span>
            </p>
            <img
              src="data:image/jpeg;base64,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"
              alt=""
              className="mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BarraDiRicerca;
