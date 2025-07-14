import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import React from "react";

const BarraDiRicerca = () => {
  return (
    <div className="w-100 me-3 d-flex justify-content-center align-items-center ">
      <Form.Control
        type="text"
        placeholder="Cosa cerchi per il tuo amico peloso? "
      />
      <FontAwesomeIcon icon={faMagnifyingGlass} className="lente" />
    </div>
  );
};

export default BarraDiRicerca;
