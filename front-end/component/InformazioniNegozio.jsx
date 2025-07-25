import React from "react";

const InformazioniNegozio = () => {
  return (
    <div className="sfondoGrigio pt-3">
      <p className="fs-3 text-center fw-bolder">
        Un po' su <span className="corsivo fs-2">Zompettando</span>
      </p>
      <div className="d-flex mt-5">
        <div className="contenitoreFoto40 me-4">
          <img
            src="https://www.quattrozampe.online/wp-content/uploads/2016/05/Negozi-per-animali-3.jpg"
            alt=""
            className="w-100 pb-5"
          />
        </div>
        <div className="w-75">
          <p className="fs-5">
            Zompettando nasce dal desiderio concreto di offrire un{" "}
            <span className="scrittaMarrone fs-bold">
              punto di riferimento affidabile{" "}
            </span>
            e accogliente per tutti coloro che hanno a cuore il
            <span className="scrittaMarrone fs-bold">
              {" "}
              benessere degli animali
            </span>
            . L'idea prende forma dall'esperienza diretta e dalla
            <span className="scrittaMarrone fs-bold"> passione</span> di chi, da
            sempre, vive a stretto contatto con cani, gatti, piccoli roditori e
            volatili, conoscendone i bisogni e il valore affettivo che portano
            nelle nostre vite. Con l'obiettivo di unire qualità, competenza e
            attenzione per ogni dettaglio, abbiamo dato vita a un negozio in cui
            ogni scelta è guidata dal
            <span className="ScrittaMarrone fs-bold">rispetto</span> e
            <span className="ScrittaMarrone fs-bold">dalla</span> cura verso
            ogni specie. Zompettando non è solo un punto vendita, ma un progetto
            nato per costruire un rapporto più consapevole e profondo tra le
            persone e i loro animali.
          </p>{" "}
          <br />
          <p className="fs-5">
            Che tu viva con un cane scatenato, un gatto regale, un coniglio
            curioso o un canarino che canta al mattino, Da Zompettando, ogni
            animale è speciale. Passa a trovarci. Il tuo animale ti ringrazierà…
            <span className="corsivo fw-bold fs-4"> Zompettando </span>di gioia!
          </p>
        </div>
      </div>
    </div>
  );
};

export default InformazioniNegozio;
