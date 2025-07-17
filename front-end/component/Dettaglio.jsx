import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { PiDogDuotone } from "react-icons/pi";
import { PiCatDuotone } from "react-icons/pi";
import { LuTurtle } from "react-icons/lu";
import { PiRabbitDuotone } from "react-icons/pi";
import { PiBirdDuotone } from "react-icons/pi";
import { FaFishFins } from "react-icons/fa6";

const Dettaglio = () => {
  const { id } = useParams();
  const [prodotto, setProdotto] = useState("");
  useEffect(() => {
    fetch(`http://localhost:8080/dettagli/${id}`, {})
      .then((res) => {
        if (!res.ok) {
          return res.text().then((errorMessage) => {
            throw new Error(errorMessage);
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.prodotto);
        setProdotto(data.prodotto);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [id]);

  return (
    <div className="sfondoDettagli ">
      <h2 className="py-3 ms-5">{prodotto.nome}</h2>
      <div>
        <div className=" mt-2 ms-5 p-3 bg-white contenitoreDettagli d-flex align-items-center">
          <img
            src={prodotto.immagineUrl}
            alt=""
            className=" h-75 fotoProdotto ms-5"
          />
          <div className=" ms-5 d-flex align-items-start h-100 w-75 flex-column">
            <div className=" mt-3 d-flex align-items-center justify-content-center contenitoreIcona">
              {prodotto.tipoAnimale === "CANE" && (
                <PiDogDuotone className=" fs-4 icona" />
              )}
              {prodotto.tipoAnimale === "GATTO" && (
                <PiCatDuotone className="fs-4 icona" />
              )}
              {prodotto.tipoAnimale === "TARTARUGA" && (
                <LuTurtle className="fs-4 icona" />
              )}
              {prodotto.tipoAnimale === "CONIGLIO" && (
                <PiRabbitDuotone className="fs-4 icona" />
              )}
              {prodotto.tipoAnimale === "UCCELLO" && (
                <PiBirdDuotone className="fs-4 icona" />
              )}
              {prodotto.tipoAnimale === "PESCE" && (
                <FaFishFins className="fs-4 icona" />
              )}
            </div>
            <p className="mt-5">{prodotto.descrizione}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dettaglio;
