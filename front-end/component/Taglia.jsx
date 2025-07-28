import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Taglia = ({ onSelezioneTaglia }) => {
  const [selezionato, setSelezionato] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  return (
    <div className="d-flex flex-column">
      {queryParams.get("specialista") != "Veterinario" && (
        <>
          <div
            className={` d-flex align-items-center ${
              selezionato === 1 ? "cliccato" : "nonCliccato"
            }`}
            onClick={() => {
              setSelezionato(1), onSelezioneTaglia("GRANDE");
            }}
          >
            {queryParams.get("specialista") == "Toelettatore" && (
              <div className="d-flex">
                <div className="fotoProdottoToelettatore ps-2 me-2 ">
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
            )}
            {queryParams.get("specialista") == "Addestratore" && (
              <div className="d-flex">
                <div className="fotoProdottoAddestratore ps-2 me-2  ">
                  <img
                    src="../src/assets/doggo.jpg"
                    alt=""
                    className="w-100 my-2"
                  />
                </div>
                <div className="d-flex flex-column">
                  <p className="fs-4 m-0 fw-bold">
                    Addestratore -taglia grande
                  </p>
                  <div className="text-secondary fs-6">
                    <small className=" border border-top-0 border-bottom-0 border-start-0 pe-1">
                      1 ora
                    </small>
                    <small> 40,00€</small>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            className={` d-flex align-items-center  ${
              selezionato === 2 ? "cliccato" : "nonCliccato"
            }`}
            onClick={() => {
              setSelezionato(2), onSelezioneTaglia("MEDIA");
            }}
          >
            {queryParams.get("specialista") == "Toelettatore" && (
              <div className="d-flex">
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
            )}
            {queryParams.get("specialista") == "Addestratore" && (
              <div className="d-flex">
                <div className="fotoProdottoAddestratore ps-2 me-2  ">
                  <img
                    src="../src/assets/doggo.jpg"
                    alt=""
                    className="w-100 my-2"
                  />
                </div>
                <div className="d-flex flex-column">
                  <p className="fs-4 m-0 fw-bold">Addestratore -taglia media</p>
                  <div className="text-secondary fs-6">
                    <small className=" border border-top-0 border-bottom-0 border-start-0 pe-1">
                      1 ora
                    </small>
                    <small> 45,00€</small>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            className={` d-flex align-items-center ${
              selezionato === 3 ? "cliccato" : "nonCliccato"
            }`}
            onClick={() => {
              setSelezionato(3), onSelezioneTaglia("PICCOLA");
            }}
          >
            {queryParams.get("specialista") == "Toelettatore" && (
              <div className="d-flex">
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
            )}
            {queryParams.get("specialista") == "Addestratore" && (
              <div className="d-flex">
                <div className="fotoProdottoAddestratore ps-2 me-2  ">
                  <img
                    src="../src/assets/doggo.jpg"
                    alt=""
                    className="w-100 my-2"
                  />
                </div>
                <div className="d-flex flex-column">
                  <p className="fs-4 m-0 fw-bold">
                    Addestratore -taglia piccola
                  </p>
                  <div className="text-secondary fs-6">
                    <small className=" border border-top-0 border-bottom-0 border-start-0 pe-1">
                      1 ora
                    </small>
                    <small> 50,00€</small>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
      {queryParams.get("specialista") == "Veterinario" && (
        <div
          className={` d-flex align-items-center ${
            selezionato === 1 ? "cliccato" : "nonCliccato"
          }`}
          onClick={() => {
            setSelezionato(1), onSelezioneTaglia("GRANDE");
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
            <p className="fs-4 m-0 fw-bold">Veterinario - taglia univoca</p>
            <div className="text-secondary fs-6">
              <p className="fs-6 m-0 fw-bold"> 50,00€</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Taglia;
