import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import React from "react";

const Prodotti = () => {
  const navigate = useNavigate();
  return (
    <div className="sfondoRosa ">
      <p className="fs-2 text-center fw-bolder pt-4">
        I nostri prodotti per la
        <span className="scrittaMarrone"> cura degli animali</span>
      </p>
      <div className="d-flex justify-content-around pt-4">
        <Card className="w-25 rounded-top-5 rounded-bottom-5 cartaProdotti mb-5">
          <Card.Img
            variant="top"
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEharaiKoL3PLKeJkYMWlxksBzDB7sLAi_rI35xjAwPW3KvzA4d4wqBGBI4KDQ987mcOYH84tMLQWnfDJJtRCSukJzq6qV4VFFpolhxH218MMNPqDkFp-S1ulz8dQgZ_YEkYpWSkNtQu51g/s1600/ciotole-per-cani-e-gatti-regole-consigli-e-pulizia_associazione_mammagatta-5.jpg"
            className="w-100 altezzaImmagine"
          />
          <Card.Body className="d-flex flex-column align-items-center justify-content-around">
            <Card.Title className="text-center fw-bold fs-4">
              Alimenti
            </Card.Title>

            <Button
              className="bottoneRosa w-75 rounded-pill"
              onClick={() => navigate("/ricerca?keyword=cibo")}
            >
              Per i palati più sopraffini
            </Button>
          </Card.Body>
        </Card>
        <Card className="w-25 rounded-top-5 rounded-bottom-5 cartaProdotti mb-5">
          <Card.Img
            variant="top"
            src="https://magazine.arcaplanet.it/wp-content/uploads/2023/12/dove-far-dormire-cane-di-notte.jpg"
            className="w-100 altezzaImmagine"
          />
          <Card.Body className="d-flex flex-column align-items-center justify-content-around">
            <Card.Title className="text-center fw-bold fs-4">
              Accessori
            </Card.Title>

            <Button
              className="bottoneRosa w-75 rounded-pill"
              onClick={() => navigate("/ricerca?keyword=attrezzatura")}
            >
              Per il comfort di ogni creatura
            </Button>
          </Card.Body>
        </Card>
        <Card className="w-25 rounded-top-5 rounded-bottom-5 cartaProdotti mb-5">
          <Card.Img
            variant="top"
            src="https://www.zooplus.it/magazine/wp-content/uploads/2021/03/gatto-che-gioca.webp"
            className="w-100 altezzaImmagine"
          />
          <Card.Body className="d-flex flex-column align-items-center justify-content-around">
            <Card.Title className="text-center fw-bold fs-4">
              Giocattoli
            </Card.Title>

            <Button
              className="bottoneRosa w-75 rounded-pill"
              onClick={() => navigate("/ricerca?keyword=gioco")}
            >
              Divertimento di qualità
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Prodotti;
