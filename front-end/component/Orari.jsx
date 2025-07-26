import React, { useState } from "react";

const Orari = ({ onSelezioneOrario }) => {
  const orari = [];
  const [orarioInizio, setOrarioInizio] = useState(null);
  const [orarioFine, setOrarioFine] = useState(null);
  const [cliccato, setCliccato] = useState(false);
  const creafasciaOraria = (inizio, fine) => {
    setOrarioInizio(inizio);
    setOrarioFine(fine);
    if (onSelezioneOrario) {
      onSelezioneOrario({ inizio, fine });
    }
  };

  for (let ora = 8; ora <= 17; ora++) {
    orari.push(`${ora}:00`);
    if (ora < 17) {
      orari.push(`${ora}:30`);
    }
  }

  return (
    <div className="contenitoreOrari ">
      {orari.slice(0, -1).map((orario, i) => (
        <p
          className={`m-0 py-2 text-center ${
            cliccato === i ? "cliccato" : "nonCliccato"
          }`}
          key={i}
          onClick={() => {
            setCliccato(i), creafasciaOraria(orario, orari[i + 1]);
          }}
        >
          {orario}-{orari[i + 1]}
        </p>
      ))}
    </div>
  );
};
export default Orari;
