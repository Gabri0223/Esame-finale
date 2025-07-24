import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";

const IconaCarrello = () => {
  const [numeroTotale, setNumeroTotale] = useState(0);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const interval = setInterval(() => {
      if (!token) {
        const carrello = JSON.parse(localStorage.getItem("carrello")) || [];
        const totale = carrello.reduce(
          (totale, item) => totale + item.quantità,
          0
        );
        setNumeroTotale(totale);
      } else {
        fetch("http://localhost:8080/Carrello/daToken", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error("Errore nel recupero del totale");
            }
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setNumeroTotale(data.elementiCarrello.length);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="position-relative">
      <Link to="/carrello">
        <FontAwesomeIcon icon={faCartShopping} className="carrello ms-5" />
      </Link>
      {numeroTotale > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger piùPiccolo">
          {numeroTotale}
        </span>
      )}
    </div>
  );
};

export default IconaCarrello;
