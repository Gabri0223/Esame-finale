import { Form } from "react-bootstrap";

const Login = () => {
  return (
    <div className="login-container pt-5">
      <div className="mx-auto mt-5 pt-5 px-5 pb-4 form-container d-flex flex-column align-items-center">
        <h2 className="text-center text-white titolo">Registrati</h2>

        <Form.Control
          required
          type="text"
          placeholder="Nome"
          className="mt-5 form"
        />
        <Form.Control
          required
          type="text"
          placeholder="Cognome"
          className="mt-4 form"
        />
        <div className="w-100 d-flex mt-2">
          <small className="text-danger">*Facoltativo</small>
        </div>
        <Form.Control
          required
          type="imgUrl"
          placeholder="URL Immagine"
          className="form"
        />
        <Form.Control
          required
          type="text"
          placeholder="Username"
          className="mt-4 form"
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

export default Login;
