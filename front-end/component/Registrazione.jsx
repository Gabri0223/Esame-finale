import { Form } from "react-bootstrap";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Registrazione = () => {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errore, setErrore] = useState("");
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nome,
          cognome: cognome,
          username: username,
          password: password,
          imgUrl: avatar,
        }),
      });

      if (!response.ok) {
        setErrore("Login fallito");
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      setErrore("Errore di rete o server non disponibile");
    }
  };

  return (
    <div className="login-container pt-1 ">
      <div className="mx-auto mt-2 pt-5 px-5 pb-4 form-container">
        <h2 className="text-center text-white titolo">
          Registrati a Zompettando
        </h2>
        <Form
          onSubmit={handleSubmit}
          className="w-100 d-flex flex-column align-items-center"
        >
          <Form.Control
            required
            type="text"
            placeholder="Nome"
            className="mt-5 form"
            onChange={(e) => setNome(e.target.value)}
          />
          <Form.Control
            required
            type="text"
            placeholder="Cognome"
            className="mt-4 form"
            onChange={(e) => setCognome(e.target.value)}
          />
          <div className="w-100 d-flex mt-2">
            <small className="text-danger">*Facoltativo</small>
          </div>
          <Form.Control
            type="url"
            placeholder="URL Immagine"
            className="form"
            onChange={(e) => setAvatar(e.target.value)}
          />
          <Form.Control
            required
            type="text"
            placeholder="Username"
            className="mt-4 form"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Control
            required
            type="password"
            placeholder="Password"
            className="mt-4 form"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="w-75">
            <button
              className="btn btn-primary w-100 mt-5 py-2 bottone"
              type="submit"
            >
              Registrati
            </button>
          </div>

          <small className="text-white pt-4 fs-6">
            Hai già un account?{" "}
            <Link to="/login" className="text-secondary">
              Accedi
            </Link>
          </small>
        </Form>
      </div>
    </div>
  );
};

export default Registrazione;
