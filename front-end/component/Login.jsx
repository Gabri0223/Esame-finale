import { Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import React from "react";

const Login = () => {
  const [errore, setErrore] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        console.error(response);
        const data = await response.json();
        setErrore(data.message);
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      setErrore("Errore durante il login: " + error.message);
    }
  };

  return (
    <div className="login-container pt-5">
      <div className="mx-auto mt-5 pt-5 px-5 pb-4 form-container d-flex flex-column ">
        <h2 className="text-center text-white titolo mb-5">
          Accedi al tuo account
        </h2>
        {errore && (
          <div className="alert alert-danger mb-1 d-flex align-items-center ju">
            <span className=" mb-1">⚠️</span>
            {errore}
          </div>
        )}
        <Form
          onSubmit={handleSubmit}
          className="w-100 d-flex flex-column align-items-center"
        >
          <Form.Control
            required
            type="text"
            placeholder="Username"
            className="form"
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
              Accedi
            </button>
          </div>
          <small className="text-white pt-4 fs-6">
            Non hai un account?{" "}
            <Link to="/registrazione" className="text-secondary">
              Registrati
            </Link>
          </small>
        </Form>
      </div>
    </div>
  );
};

export default Login;
