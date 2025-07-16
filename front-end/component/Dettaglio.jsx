import { useParams } from "react-router-dom";
import React from "react";

const Dettaglio = () => {
  const { id } = useParams();
  return <h1>l'id è {id}</h1>;
};

export default Dettaglio;
