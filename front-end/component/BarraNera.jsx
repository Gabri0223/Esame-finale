import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell as faBellRegular } from "@fortawesome/free-regular-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";

const BarraNera = () => {
  return (
    <Container fluid className="bg-dark">
      <Row>
        <Col xs={3} className="text-center">
          <small>
            <FontAwesomeIcon icon={faBellRegular} className="me-1" />
            Status Ordini
          </small>
        </Col>
        <Col xs={6} className="text-center">
          <small>
            Spedizione gratuita a pratire da{" "}
            <span className="text-warning">30€</span>
          </small>
        </Col>
        <Col xs={3} className="text-center">
          <small>
            <FontAwesomeIcon icon={faMessage} className="me-1" />
            Assistenza Clienti
          </small>
        </Col>
      </Row>
    </Container>
  );
};

export default BarraNera;
