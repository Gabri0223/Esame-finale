import React from "react";
import { Carousel } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const Carosello = () => {
  return (
    <Carousel fade={true} interval={3000}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.demas.it/cdn/shops/upload/selfpromotion/207.jpg"
          alt="Slide 1"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.demas.it/cdn/shops/upload/selfpromotion/202.jpg"
          alt="Slide 2"
        />
      </Carousel.Item>
      <Carousel.Item>
        <div className="caroselloAltezza">
          <img
            className="d-block w-100"
            src="https://imgcom.masterd.es/50/landings/landing-271/imagen-hero.jpg?r=202404463"
            alt="Prodotto 2"
          />
          <div className="testoSinistra">
            <h2>Il tuo cane ti porta a spasso? È ora di invertire i ruoli </h2>
            <p className="fs-5">
              Ogni cane può diventare il compagno che sogni. Serve solo il
              giusto percorso.
            </p>
            <Button className="bottoneTrasparente1">Più informazioni</Button>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="caroselloAltezza">
          <img
            className="d-block w-100"
            src="https://www.cvrs.it/wp-content/uploads/2023/03/02_ortopedia-1.jpg"
            alt="Prodotto 2"
          />
          <div className="testoDestra">
            <h2 className="testoGiallo">Clinica Veterinaria Roma nord</h2>
            <p className="fs-5 testoBeige">
              Abbiamo curato animali con ali, baffi, squame e zampette. Il tuo
              sarà in ottime mani.
            </p>
            <p className="testoBeige fs-5">Per prendere appuntamento:</p>
            <p className="fs-5">
              Telefona al:
              <span className="testoGiallo fs-4">+39 32733023421</span>
            </p>
            <Button className="bottoneTrasparente2">Più informazioni</Button>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default Carosello;
