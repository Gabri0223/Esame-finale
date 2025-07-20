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
import ProdottiCorrelati from "../component/ProdottiCorrellati";
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
        setProdotto(data.prodotto);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [id]);

  return (
    <div className="sfondoDettagli ">
      <h2 className="py-3 ms-5">{prodotto.nome}</h2>
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
              {prodotto.tipoGiochi === "TUNNEL" && (
                <>
                  <option title="le misure sono per lunghezza e larghezza">
                    scegli la grandezza
                  </option>
                  <option
                    value="S"
                    title="le misure sono per lunghezza e larghezza"
                  >
                    100 cm X 20 cm
                  </option>
                  <option
                    value="M"
                    title="le misure sono per lunghezza e larghezza"
                  >
                    120 cm X 25 cm
                  </option>
                  <option
                    value="L"
                    title="le misure sono per lunghezza e larghezza"
                  >
                    150cm X 25cm
                  </option>
                </>
              )}
              {prodotto.tipoGiochi === "RAMPE" && (
                <>
                  <option title="le misure sono per lunghezza e larghezza">
                    scegli la grandezza
                  </option>
                  <option
                    value="S"
                    title="le misure sono per lunghezza e larghezza"
                  >
                    60 cm X 15 cm
                  </option>
                  <option
                    value="M"
                    title="le misure sono per lunghezza e larghezza"
                  >
                    80 cm X 20 cm
                  </option>
                  <option
                    value="L"
                    title="le misure sono per lunghezza e larghezza"
                  >
                    120cm X 25cm
                  </option>
                </>
              )}
              {prodotto.tipoGiochi === "CASETTE" && (
                <>
                  <option title="Le misure sono per lunghezza larghezza e altezza">
                    Scegli la grandezza
                  </option>
                  <option
                    value="S"
                    title="Le misure sono per lunghezza larghezza e altezza"
                  >
                    40 X 30 X 30 cm
                  </option>
                  <option
                    value="M"
                    title="Le misure sono per lunghezza larghezza e altezza"
                  >
                    60 X 40 X 40 cm
                  </option>
                  <option
                    value="L"
                    title="Le misure sono per la lunghezza larghezza e altezza"
                  >
                    100 X 60 X 60 cm{" "}
                  </option>
                  <option
                    value="XL"
                    title="Le misure sono per lunghezza larghezza e altezza"
                  >
                    120 X 60 X 60 cm
                  </option>
                </>
              )}
              {prodotto.tipoGiochi === "BEVITOGLIO" && (
                <>
                  <option> Scegli la capienza</option>
                  <option value="S">Piccola: 500ml</option>
                  <option value="M">Media: 1L</option>
                  <option value="XL">Alta: 2L</option>
                </>
              )}
              {prodotto.tipoGiochi === "CORDA" && (
                <>
                  <option>Seleziona la lunghezza</option>
                  <option value="S">20-30 cm</option>
                  <option value="M">30-50cm</option>
                  <option value="L">50-70cm</option>
                </>
              )}
              {prodotto.tipoGiochi === "PALLINA" && (
                <>
                  <option>Seleziona il diametro</option>
                  <option value="XS">5,0 cm</option>
                  <option value="S">7,5 cm</option>
                  <option value="M">10,0 cm</option>
                </>
              )}
              {prodotto.tipoGiochi === "KONG" &&
                ((prodotto.tipoAnimale === "CANE" && (
                  <>
                    <option>Seleziona la lunghezza</option>
                    <option value="XS">5,7 cm</option>
                    <option value="S">7,0 cm</option>
                    <option value="M">8,5 cm</option>
                    <option value="L">10,0 cm</option>
                    <option value="XL">12,7 cm</option>
                    <option value="XXL">15,2 cm</option>
                  </>
                )) ||
                  (prodotto.tipoAnimale === "CONIGLIO" && (
                    <>
                      <option title="le misure sono per lunghezza e larghezza">
                        Seleziona la dimensione
                      </option>
                      <option
                        title="le misure sono per lunghezza e diametro"
                        value="S"
                      >
                        6 X 6 cm
                      </option>
                      <option
                        title="le misure sono per lunghezza e diametro"
                        value="M"
                      >
                        7 - 10 cm
                      </option>
                      <option
                        title="le misure sono per lunghezza e diametro"
                        value="L"
                      >
                        15 - 20 cm
                      </option>
                    </>
                  )))}
              {prodotto.tipoGiochi === "GOMITOLO" && (
                <>
                  <option>Seleziona il diametro </option>
                  <option value="S"> 4,0 cm</option>
                  <option value="M"> 6,0 cm </option>
                  <option value="L"> 10,0 cm</option>
                </>
              )}
              {prodotto.tipoGiochi === "TOPOLINO" && (
                <>
                  <option>Seleziona la lunghezza </option>
                  <option value="S">5,0 cm</option>
                  <option value="M">8,0 cm</option>
                  <option value="L">10,0 cm</option>
                </>
              )}
              {prodotto.tipoGiochi === "CANNA" && (
                <>
                  <option>Seleziona la lunghezza del filo</option>
                  <option value="S">40 cm</option>
                  <option value="M">80 cm</option>
                  <option value="S">100 cm</option>
                </>
              )}
              {prodotto.tipoCibo === "SECCO" && (
                <>
                  <option>Seleziona la quantità</option>
                  <option value="XS"> 2 KG</option>
                  <option value="S"> 10 KG</option>
                  <option value="M">15 KG</option>
                  <option value="L"> 20 KG</option>
                  <option value="XL"> 25 kg</option>
                </>
              )}
              {prodotto.tipoCibo === "UMIDO" && (
                <>
                  <option>Seleziona la quantità</option>
                  <option value="XS"> 150 gr</option>
                  <option value="S"> 400 gr</option>
                  <option value="M"> 150 gr</option>
                  <option value="L"> 800 gr</option>
                  <option value="XL"> 1200 gr</option>
                </>
              )}
            </Form.Select>
          </div>
          <div className="w-100 d-flex">
            <div className="verticalLine mt-5 w-50">
              <p className="fs-4 fw-bold m-0 mb-2">Specifiche prodotto</p>
              {prodotto.tipoAnimale === "CANE" &&
                (prodotto.tipoAttrezzatura === "COLLARI" ||
                  prodotto.tipoGiochi === "PALLINA") && (
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
                        <span className="fw-bold"> Utile per:</span> provare il
                        prodotto
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
              {prodotto.tipoAttrezzatura === "LETTIERE" &&
                prodotto.tipoAnimale === "CONIGLIO" && (
                  <p>Formato per conigli</p>
                )}
              {(prodotto.tipoGiochi === "TUNNEL" ||
                prodotto.tipoGiochi === "RAMPE" ||
                prodotto.tipoGiochi === "CASETTE" ||
                prodotto.tipoGiochi === "BEVITOGLIO") && (
                <p className="fw-bold">
                  Utile per:
                  {prodotto.tagliaAttrezzatura === "S" && (
                    <span className="fw-normal ms-2">
                      Cuccioli o conigli nani
                    </span>
                  )}
                  {prodotto.tagliaAttrezzatura === "M" && (
                    <span className="fw-normal ms-2">
                      Conigli medi (come l' Ariete nano)
                    </span>
                  )}
                  {prodotto.tagliaAttrezzatura === "L" && (
                    <span className="fw-normal ms-2">
                      Conigli grandi o giganti (come le Lepri)
                    </span>
                  )}
                  {prodotto.tagliaAttrezzatura === "XL" && (
                    <span className="fw-normal ms-2">Due o più conigli </span>
                  )}
                </p>
              )}
              {prodotto.tipoGiochi === "CORDA" && (
                <p className="fw-bold">
                  Ideale per:
                  {prodotto.tagliaAttrezzatura === "S" && (
                    <span className="fw-normal ms-2">
                      giochi leggeri e masticazione delicata
                    </span>
                  )}
                  {prodotto.tagliaAttrezzatura === "M" && (
                    <span className="fw-normal ms-2">
                      giochi di tiro e masticazione moderata
                    </span>
                  )}
                  {prodotto.tagliaAttrezzatura === "L" && (
                    <span className="fw-normal ms-2">cani forti </span>
                  )}
                </p>
              )}
              {prodotto.tipoGiochi === "KONG" &&
                ((prodotto.tipoAnimale === "CANE" && (
                  <p className="fw-bold">
                    Peso consigliato:
                    {prodotto.tagliaAttrezzatura === "XS" && (
                      <span className="fw-normal ms-2"> Fino a 2 KG</span>
                    )}
                    {prodotto.tagliaAttrezzatura === "S" && (
                      <span className="fw-normal ms-2"> Fino a 9 KG</span>
                    )}
                    {prodotto.tagliaAttrezzatura === "M" && (
                      <span className="fw-normal ms-2"> 7 - 16 KG</span>
                    )}
                    {prodotto.tagliaAttrezzatura === "L" && (
                      <span className="fw-normal ms-2"> 13 - 30 KG</span>
                    )}
                    {prodotto.tagliaAttrezzatura === "XL" && (
                      <span className="fw-normal ms-2"> 27 - 38 KG</span>
                    )}
                    {prodotto.tagliaAttrezzatura === "XXL" && (
                      <span className="fw-normal ms-2"> 38+ KG</span>
                    )}
                  </p>
                )) ||
                  (prodotto.tipoAnimale === "CONIGLIO" && (
                    <p className="fw-bold">
                      utile da:
                      {prodotto.tagliaAttrezzatura === "S" && (
                        <span className="fw-normal ms-2">
                          Rotolare e distribuire snack
                        </span>
                      )}
                      {prodotto.tagliaAttrezzatura === "M" && (
                        <span className="fw-normal ms-2">
                          Rosicchiare, consumare
                        </span>
                      )}
                      {prodotto.tagliaAttrezzatura === "L" && (
                        <span className="fw-normal ms-2">
                          Tirare, rosicchiare
                        </span>
                      )}
                    </p>
                  )))}
              {(prodotto.tipoGiochi == "GOMITOLO" ||
                prodotto.tipoGiochi == "TOPOLINO" ||
                prodotto.tipoGiochi == "CANNA") && (
                <p className="fw-bold">
                  Lifestage:
                  {prodotto.tagliaAttrezzatura === "S" && (
                    <span className="fw-normal ms-2"> Cucciolo</span>
                  )}
                  {prodotto.tagliaAttrezzatura === "M" && (
                    <span className="fw-normal ms-2"> Adolescente</span>
                  )}
                  {prodotto.tagliaAttrezzatura === "L" && (
                    <span className="fw-normal ms-2">Adulto</span>
                  )}
                </p>
              )}
              <p className="mb-1 d-flex justify-content-between pe-3">
                <span className="fw-bold">Marca: </span> {prodotto.marca}
              </p>
              {prodotto.tipoProdotto === "CIBO" && (
                <>
                  <p className="mb-1 d-flex justify-content-between pe-3">
                    <span className="fw-bold me-2">lifeStage: </span>{" "}
                    {prodotto.etaAnimale.toLowerCase()}
                  </p>
                  <p className="d-flex justify-content-between pe-3">
                    <span className="fw-bold me-2">Taglia: </span>{" "}
                    {prodotto.tagliaAnimale.toLowerCase()}
                  </p>
                </>
              )}
              <p className="fs-5 mt-3">
                Ordine singolo:
                {prodotto.tagliaAttrezzatura === "" && (
                  <span className="ms-1 fw-bold fs-5">
                    {prodotto.prezzo.toFixed(2)}
                  </span>
                )}
                {prodotto.tagliaAttrezzatura === "XS" && (
                  <span className="ms-1 fw-bold fs-5">
                    {(prodotto.prezzo - 5.0).toFixed(2)}
                  </span>
                )}
                {prodotto.tagliaAttrezzatura === "S" && (
                  <span className=" ms-1 fw-bold fs-5">
                    {(prodotto.prezzo - 2.0).toFixed(2)}€
                  </span>
                )}
                {prodotto.tagliaAttrezzatura === "M" && (
                  <span className=" ms-1 fw-bold fs-5">
                    {prodotto.prezzo.toFixed(2)}€
                  </span>
                )}
                {prodotto.tagliaAttrezzatura === "L" && (
                  <span className="ms-1 fw-bold fs-5">
                    {(prodotto.prezzo + 2).toFixed(2)}€
                  </span>
                )}
                {prodotto.tagliaAttrezzatura === "XL" && (
                  <span className="ms-1 fw-bold fs-5">
                    {(prodotto.prezzo + 5).toFixed(2)}€
                  </span>
                )}
              </p>
            </div>
            <div className="mt-5 ms-3 d-flex flex-column">
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
                    onClick={() => setQuantità((prev) => Math.max(prev - 1, 1))}
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

      <h2 className="text-center my-3">
        Altri prodotti per:
        <span className="fw-bold"> {prodotto.tipoAnimale}</span>
      </h2>
      <div>
        <ProdottiCorrelati
          prodottoId={prodotto.id}
          tipoAnimale={prodotto.tipoAnimale}
        />
      </div>
    </div>
  );
};

export default Dettaglio;
