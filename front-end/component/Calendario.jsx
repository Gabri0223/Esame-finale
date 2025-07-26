import React, { useState } from "react";

const giorniSettimana = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];

function Calendario({ onDateChange }) {
  const [oggi] = useState(new Date());
  const [anno, setAnno] = useState(oggi.getFullYear());
  const [mese, setMese] = useState(oggi.getMonth());
  const [dataSelezionata, setDataSelezionata] = useState(null);

  const giorniNelMese = new Date(anno, mese + 1, 0).getDate();
  let primoGiorno = new Date(anno, mese, 1).getDay();
  primoGiorno = primoGiorno === 0 ? 6 : primoGiorno - 1;

  const mesePrecedente = () => {
    if (mese === 0) {
      setAnno(anno - 1);
      setMese(11);
    } else {
      setMese(mese - 1);
    }
  };

  const meseSuccessivo = () => {
    if (mese === 11) {
      setAnno(anno + 1);
      setMese(0);
    } else {
      setMese(mese + 1);
    }
  };

  const giorniArray = [];
  for (let i = 0; i < primoGiorno; i++) {
    giorniArray.push(null);
  }
  for (let i = 1; i <= giorniNelMese; i++) {
    giorniArray.push(i);
  }

  const selezionaData = (giorno) => {
    if (!giorno) return;
    const data = new Date(anno, mese, giorno);
    setDataSelezionata(data);
    if (onDateChange) {
      onDateChange(data);
    }
  };

  function isSelected(giorno) {
    if (dataSelezionata === null) {
      return false;
    }
    if (
      giorno === dataSelezionata.getDate() &&
      mese === dataSelezionata.getMonth() &&
      anno === dataSelezionata.getFullYear()
    ) {
      return true;
    } else {
      return false;
    }
  }
  const renderGiorno = function (giorno) {
    return <div key={giorno}>{giorno}</div>;
  };

  return (
    <div className="contenitoreCalndario ">
      <div className="d-flex justify-content-between mb-2">
        <button onClick={mesePrecedente}>{"<"}</button>
        <div>
          {new Date(anno, mese).toLocaleString("it-IT", {
            month: "long",
            year: "numeric",
          })}
        </div>
        <button onClick={meseSuccessivo}>{">"}</button>
      </div>

      <div
        className="text-center fw-bold"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "4px",
        }}
      >
        {giorniSettimana.map((giorno, i) => (
          <div key={i} className="giorno-settimana p-2">
            {giorno}
          </div>
        ))}
      </div>
      <div
        className="text-center"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "4px",
        }}
      >
        {giorniArray.map((giorno, i) => {
          const isValid = giorno !== null;
          const isActive = isValid && isSelected(giorno);
          let className = "giorno";
          if (isValid) className += " p-2 m-1 rounded text-center";
          if (isActive) className += " sfondoRosa text-white";

          return (
            <div
              key={i}
              onClick={() => isValid && selezionaData(giorno)}
              className={className}
              style={{ cursor: isValid ? "pointer" : "default" }}
            >
              {giorno || ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendario;
