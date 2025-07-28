import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import React from "react";

const Servizi = () => {
  const navigate = useNavigate();
  return (
    <div className="sfondoRosa pb-5 ">
      <h2 className="fw-bolder text-center pt-4">I nostri servizi</h2>
      <p className="fs-4 text-center">Ogni esigenza, una soluzione su misura</p>
      <div className="d-flex justify-content-around">
        <Card className="cardServizi rounded-bottom-3">
          <Card.Title className="text-center fw-bold sfondoMarrone rounded-top-2 p-2 m-0 bordoSottoGiallo rounded-bottom-3">
            <span className="corsivo fs-3">Profumando</span> - petWash
          </Card.Title>
          <Card.Img
            variant="top"
            src="https://www.shutterstock.com/image-vector/dog-wash-logo-design-pet-600nw-2260572349.jpg"
            className="position-relative"
          />

          <Button
            className=" bottoneServizi w-75"
            onClick={() => navigate(`/prenotazione?specialista=Toelettatore`)}
          >
            Prenota subito
          </Button>
        </Card>
        <Card className="cardServizi rounded-bottom-3">
          <Card.Title className="text-center fw-bold sfondoMarrone rounded-top-2 p-2 m-0 bordoSottoGiallo rounded-bottom-3">
            <span className="corsivo fs-3">ZampaSana</span> - Veterinario
          </Card.Title>
          <Card.Img
            variant="top"
            src="../src/assets/ZampaSanaLogo (2).png"
            className="position-relative h-100"
          />
          <Button
            className=" bottoneServizi w-75"
            onClick={() => navigate(`/prenotazione?specialista=Veterinario`)}
          >
            Prenota subito
          </Button>
        </Card>
        <Card className="cardServizi rounded-bottom-3">
          <Card.Title className="text-center fw-bold sfondoMarrone rounded-top-2 p-2 m-0 bordoSottoGiallo rounded-bottom-3">
            <span className="corsivo fs-3">ZampaAcademy</span> - addestramento
            cinofilo
          </Card.Title>
          <Card.Img
            variant="top"
            src="../src/assets/ZampAcademyLogo.png"
            className="position-relative h-100"
          />
          <Button
            className=" bottoneServizi w-75"
            onClick={() => navigate(`/prenotazione?specialista=Addestratore`)}
          >
            Prenota subito
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Servizi;
