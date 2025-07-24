import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import React, { useState } from "react";

const BottonePagamento = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [pagato, setPagato] = useState(false);
  const eliminaElementi = () => {
    fetch("http://localhost:8080/Carrello", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Errore durante la cancellazione");
        }
      })
      .then((data) => {
        setPagato(true);
        setTimeout(() => navigate("/"), 1500);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="d-flex align-items-end flex-column">
      {pagato && (
        <div className="d-flex w-50 justify-content-center align-items-center">
          <small className="scrittaVerde me-3 text-center">
            <FaCheckCircle /> Pagamento effettuato
          </small>
        </div>
      )}
      <Button
        className="rounded-pill mb-3 me-3 w-50"
        onClick={() => {
          eliminaElementi();
        }}
      >
        Procedi al pagamento
      </Button>
    </div>
  );
};

export default BottonePagamento;
