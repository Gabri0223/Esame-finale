import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "react-bootstrap/Dropdown";

const LinkAccedi = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:8080/auth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Errore nel recupero dati utente");
          return res.json();
        })
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.error("Errore nel fetch dell'utente:", error);
        });
    }
  }, []);
  return (
    <div>
      {!userData ? (
        <Link to="/login" className="d-flex align-items-center ">
          <FontAwesomeIcon icon={faUser} className="utente" />
          <p className="accedi ms-1 my-0 me-4">Accedi o Registrati</p>
        </Link>
      ) : (
        <div className="d-flex align-items-center">
          <img
            src="https://picsum.photos/200?random"
            alt="Profilo utente"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              className="d-flex align-items-center"
            >
              <p className="accedi ms-1 my-0">
                {" "}
                <span className="fw-bold">{userData.username}</span>
              </p>
            </Dropdown.Toggle>

            <Dropdown.Menu className="logOutDropdown" align="end">
              <Dropdown.Item className="p-0 ">
                <button
                  className="logOutButton p-0 "
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("carrello");
                    window.location.reload();
                    setUserData(null);
                  }}
                >
                  <span className="m-0"> Logout</span>
                </button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
    </div>
  );
};

export default LinkAccedi;
