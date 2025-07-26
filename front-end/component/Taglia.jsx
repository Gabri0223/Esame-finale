import React, { useState } from "react";

const Taglia = () => {
  const [taglia, setTaglia] = useState("");
  const [selezionato, setSelezionato] = useState(null);
  return (
    <div className="d-flex flex-column">
      <div
        className={` d-flex align-items-center ${
          selezionato === 1 ? "cliccato" : "nonCliccato"
        }`}
        onClick={() => {
          setSelezionato(1), setTaglia("GRANDE");
        }}
      >
        <div className="fotoProdottoToelettatore ps-2 me-2">
          <img
            src="https://storage.googleapis.com/booxi-api-be-pictures/tbl_service_2024-06-03_07-24-49_218910"
            alt=""
            className="w-100 my-2"
          />
        </div>
        <div className="d-flex flex-column">
          <p className="fs-4 m-0 fw-bold">Pet wash-taglia grande</p>
          <div className="text-secondary fs-6">
            <small className=" border border-top-0 border-bottom-0 border-start-0 pe-1">
              30 min
            </small>
            <small> 18,00€</small>
          </div>
        </div>
      </div>
      <div
        className={` d-flex align-items-center  ${
          selezionato === 2 ? "cliccato" : "nonCliccato"
        }`}
        onClick={() => {
          setSelezionato(2), setTaglia("MEDIA");
        }}
      >
        <div className="fotoProdottoToelettatore ps-2 me-2">
          <img
            src="https://storage.googleapis.com/booxi-api-be-pictures/tbl_service_2024-06-03_07-24-49_218910"
            alt=""
            className="w-100 my-2"
          />
        </div>
        <div className="d-flex flex-column">
          <p className="fs-4 m-0 fw-bold">Pet wash-taglia media</p>
          <div className="text-secondary fs-6">
            <small className=" border border-top-0 border-bottom-0 border-start-0 pe-1">
              30 min
            </small>
            <small> 14,00€</small>
          </div>
        </div>
      </div>
      <div
        className={` d-flex align-items-center ${
          selezionato === 3 ? "cliccato" : "nonCliccato"
        }`}
        onClick={() => {
          setSelezionato(3), setTaglia("PICCOLA");
        }}
      >
        <div className="fotoProdottoToelettatore ps-2 me-2">
          <img
            src="https://storage.googleapis.com/booxi-api-be-pictures/tbl_service_2024-06-03_07-24-49_218910"
            alt=""
            className="w-100 my-2"
          />
        </div>
        <div className="d-flex flex-column ">
          <p className="fs-4 m-0 fw-bold">Pet wash-taglia piccola</p>
          <div className="text-secondary fs-6">
            <small className=" border border-top-0 border-bottom-0 border-start-0 pe-1">
              30 min
            </small>
            <small> 10,00€</small>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Taglia;
