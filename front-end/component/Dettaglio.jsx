import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { PiDogDuotone } from "react-icons/pi";
import { PiCatDuotone } from "react-icons/pi";
import { LuTurtle } from "react-icons/lu";
import { PiRabbitDuotone } from "react-icons/pi";
import { PiBirdDuotone } from "react-icons/pi";
import { FaFishFins } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Dettaglio = () => {
  const { id } = useParams();
  const [prodotto, setProdotto] = useState("");
  const [quantità, setQuantità] = useState(1);
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
            <div className="w-100">
              <Form.Select
                aria-label="Seleziona un'opzione"
                onChange={(e) =>
                  setProdotto({
                    ...prodotto,
                    tagliaAttrezzatura: e.target.value,
                  })
                }
                className="w-100 mt-4 h-100 bordiViola"
              >
                {prodotto.tipoAttrezzatura === "COLLARI" &&
                  prodotto.tipoAnimale === "CANE" && (
                    <>
                      <option>Seleziona la larghezza</option>
                      <option value="XS">XS 20 - 30 cm</option>
                      <option value="S">S 30 - 40 cm</option>
                      <option value="M">M 40 - 50 cm</option>
                      <option value="XL">XL 50 - 60 cm</option>
                    </>
                  )}
                {prodotto.tipoAttrezzatura === "GUINZAGLI" && (
                  <>
                    <option>Seleziona la lunghezza</option>
                    <option value="120cm">120 cm</option>
                    <option value="150cm">150 cm</option>
                    <option value="180cm">180 cm</option>
                  </>
                )}
                {prodotto.tipoAttrezzatura === "COLLARI" &&
                  prodotto.tipoAnimale === "GATTO" && (
                    <>
                      <option>Seleziona la larghezza</option>
                      <option value="XS">XS / Piccolo 15 - 20 cm</option>
                      <option value="S">S / Medio 18 - 25 cm</option>
                    </>
                  )}
                {prodotto.tipoAttrezzatura == "LETTIERE" &&
                  prodotto.tipoAnimale === "GATTO" && (
                    <>
                      <option>seleziona i chili</option>
                      <option value="S"> prova (1-2 kg)</option>
                      <option value="M"> piccolo (5 kg)</option>
                      <option value="L">medio (10 kg)</option>
                      <option value="XL">grande(15-20 kg)</option>
                    </>
                  )}
                {prodotto.tipoAttrezzatura === "LETTIERE" &&
                  prodotto.tipoAnimale === "CONIGLIO" && (
                    <option value="M">2 - 4 kg </option>
                  )}
              </Form.Select>
            </div>
            <div className="w-100 d-flex">
              <div className="verticalLine mt-5 w-50">
                <p className="fs-4 fw-bold m-0 mb-2">Specifiche prodotto</p>
                {prodotto.tipoAnimale === "CANE" &&
                  prodotto.tipoAttrezzatura === "COLLARI" && (
                    <small className="fw-bold fs-6">
                      taglia {prodotto.tipoAnimale?.toLowerCase()}:{" "}
                      {prodotto.tagliaAttrezzatura === "XS" && (
                        <span className="fw-normal">piccola</span>
                      )}
                      {prodotto.tagliaAttrezzatura === "S" && (
                        <span className="fw-normal ">media</span>
                      )}
                      {prodotto.tagliaAttrezzatura === "M" && (
                        <span className="fw-normal ">grande</span>
                      )}
                      {prodotto.tagliaAttrezzatura === "XL" && (
                        <span className="fw-normal ">molto grande</span>
                      )}
                    </small>
                  )}
                {prodotto.tipoAttrezzatura === "GUINZAGLI" && (
                  <small className="fs-6">
                    {" "}
                    <span className="fw-bold">Utile per:</span> girare in città
                  </small>
                )}
                {prodotto.tipoAnimale === "GATTO" &&
                  prodotto.tipoAttrezzatura === "COLLARI" && (
                    <small className="fw-bold fs-6">
                      {" "}
                      taglia {prodotto.tipoAnimale?.toLowerCase()}:{" "}
                      {prodotto.tagliaAttrezzatura === "XS" && (
                        <span className="fw-normal">piccola/media</span>
                      )}
                      {prodotto.tagliaAttrezzatura === "S" && (
                        <span className="fw-normal">grande</span>
                      )}
                    </small>
                  )}
                {prodotto.tipoAnimale === "GATTO" &&
                  prodotto.tipoAttrezzatura == "LETTIERE" && (
                    <p>
                      {prodotto.tagliaAttrezzatura === "S" && (
                        <span className="ps-2">
                          <span className="fw-bold"> Utile per:</span> provare
                          il prodotto
                        </span>
                      )}
                      {prodotto.tagliaAttrezzatura === "M" && (
                        <span>Il tuo gatto ne sarà felice</span>
                      )}
                      {prodotto.tagliaAttrezzatura === "L" && (
                        <span>
                          <span className="fw-bold">Utile per: </span> scorta o
                          formato famiglia
                        </span>
                      )}
                      {prodotto.tagliaAttrezzatura === "XL" && (
                        <span> Maxi-formato o professionale </span>
                      )}
                    </p>
                  )}
                {prodotto.tipoAnimale === "CONIGLIO" && (
                  <p>Formato per conigli</p>
                )}
                <p className="fs-5 mt-3">
                  Ordine singolo:
                  <span className=" ms-1 fw-bold fs-5">{prodotto.prezzo}€</span>
                </p>
              </div>
              <div className="mt-5 ms-3 d-flex flex-column">
                {" "}
                <p className="fs-4 fw-bold m-0 mb-2">ORDINA</p>
                <div className="d-flex align-items-center justify-content-between">
                  <p className="mb-2 ">Quantità:</p>
                </div>
                <div className="d-flex align-items-center ">
                  {quantità === 1 && (
                    <div className=" border border-2 border-secondary rounded-start aggiungiETogli  bg-secondary-subtle text-white">
                      <p className="m-0 p-2 px-3">-</p>
                    </div>
                  )}
                  {quantità > 1 && (
                    <div
                      className=" border border-2 border-black rounded-start aggiungiETogli"
                      onClick={() =>
                        setQuantità((prev) => Math.max(prev - 1, 1))
                      }
                    >
                      <p className="m-0 p-2 px-3">-</p>
                    </div>
                  )}

                  <div className=" border border-2 border-dark">
                    <p className="m-0 p-2 px-3">{quantità}</p>
                  </div>

                  <div
                    className=" border border-2 border-black rounded-end me-5 aggiungiETogli"
                    onClick={() => setQuantità((prev) => prev + 1)}
                  >
                    <p className="m-0  p-2 px-3"> + </p>
                  </div>
                  <div className="d-flex flex-column mt-4">
                    <Button className="bottoneRosa mb-2">
                      aggiungi al carrello
                    </Button>
                    <small className="piùPiccolo fw-bold">
                      <FaCartShopping /> Spedizione gratuita a pratire da 30€
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dettaglio;
