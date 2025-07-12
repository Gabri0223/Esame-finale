import { Form } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errore, setErrore] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    useEffect(() => {
      fetch("http://localhost:8080/amministratore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          cognome,
          username,
          password,
          avatar,
          ruoli: ["USER"],
        }),
      })
        .then((response) => {
          if (!response.ok) {
            setErrore("Registrazione fallita");
            return;
          }
          return response.json();
        })
        .then((data) => {
          localStorage.setItem("token", data.token);
          navigate("/me");
        })
        .catch((error) => {
          setErrore("Errore di rete o server non disponibile");
        });
    }, []);

    return (
      <div className="login-container pt-5">
        <div className="mx-auto mt-5 pt-5 px-5 pb-4 form-container d-flex flex-column align-items-center">
          <h2 className="text-center text-white titolo">
            Accedi al tuo account
          </h2>
          {errore && <div className="alert alert-danger">{errore}</div>}
          <Form.Control
            required
            type="text"
            placeholder="Username"
            className="mt-5 form"
          />
          <Form.Control
            required
            type="password"
            placeholder="Password"
            className="mt-4 form"
          />
          <div className="w-75">
            <button className="btn btn-primary w-100 mt-5 py-2 bottone">
              Accedi
            </button>
          </div>
          <small className="text-white pt-4 fs-6">
            Non hai un account?{" "}
            <a href="/registrazione" className="text-secondary">
              Registrati
            </a>
          </small>
        </div>
      </div>
    );
  };
};

export default Login;
