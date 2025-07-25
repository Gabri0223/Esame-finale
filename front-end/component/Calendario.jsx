import React, { useState } from "react";

const giorniSettimana = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"];

function Calendario({ onDateChange }) {
  const [oggi] = useState(new Date());
  const [anno, setAnno] = useState(oggi.getFullYear());
  const [mese, setMese] = useState(oggi.getMonth());
  const [dataSelezionata, setDataSelezionata] = useState(null);

  const giorniNelMese = new Date(anno, mese + 1, 0).getDate();
  const primoGiorno = new Date(anno, mese, 1).getDay();

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

  return (
    <div style={{ width: "100%", fontFamily: "Arial, sans-serif" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "8px",
          userSelect: "none",
        }}
      >
        <button onClick={mesePrecedente}>{"<"}</button>
        <div>
          {oggi.toLocaleString("it-IT", { month: "long", year: "numeric" })}
        </div>
        <button onClick={meseSuccessivo}>{">"}</button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {giorniSettimana.map(function (giorno) {
          return <div key={giorno}>{giorno}</div>;
        })}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          textAlign: "center",
        }}
      >
        {giorniArray.map(function (giorno, idx) {
          let sfondo = "transparent";
          let colore = "black";
          let cursore = "default";

          if (giorno !== null) {
            cursore = "pointer";
            if (isSelected(giorno)) {
              sfondo = "#007bff";
              colore = "white";
            }
          }

          return (
            <div
              key={idx}
              onClick={function () {
                selezionaData(giorno);
              }}
              style={{
                padding: "10px",
                margin: "2px",
                cursor: cursore,
                backgroundColor: sfondo,
                color: colore,
                borderRadius: "4px",
              }}
            >
              {giorno !== null ? giorno : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendario;
