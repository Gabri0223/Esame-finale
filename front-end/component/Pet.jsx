import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Pet = () => {
  const navigate = useNavigate();
  return (
    <div className="sfondoGrigio pb-5">
      <p className="fw-bolder fs-2 text-center pt-4">Il tuo pet?</p>

      <div className="d-flex justify-content-center">
        <div className="w-75 d-flex justify-content-around">
          <div className="contenitoreFotoAnimali ">
            <Link to={"/ricerca?keyword=cane"}>
              <img
                src="https://www.conad.it/assets/images/consigli/Quanto%20costa%20mantenere%20un%20cane%20di%20piccola%20taglia.jpg/renditions/all.jpeg?_u=f239bfa324fa2c74fd8ba8e2ce6a22bc27f71ca1"
                alt=""
                className="w-100 h-100 rounded-circle border border-5 border-primary"
              />
            </Link>
          </div>

          <div className="contenitoreFotoAnimali ">
            <Link to={"/ricerca?keyword=gatto"}>
              <img
                src="https://m.media-amazon.com/images/I/618O9wfGJhS._UF894,1000_QL80_.jpg"
                className="w-100 h-100 bordiArancioni rounded-circle  "
              />
            </Link>
          </div>
          <div className="contenitoreFotoAnimali">
            <Link to={"/ricerca?keyword=coniglio"}>
              <img
                src="../src/assets/coniglio.jpg"
                alt=""
                className="w-100 h-100 rounded-circle border border-5 border-secondary"
              />
            </Link>
          </div>
          <div className="contenitoreFotoAnimali">
            <Link to={"/ricerca?keyword=uccello"}>
              <img
                src="https://images.unsplash.com/photo-1697789344805-bc64b0874465?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI5fHx8ZW58MHx8fHx8"
                alt=""
                className="w-100 h-100 rounded-circle bordiVerdiChiaro "
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pet;
