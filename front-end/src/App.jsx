import { useState } from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import NavbarPrincipale from "../component/NavbarPrincipale.jsx";
import BarraNera from "../component/BarraNera.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../component/Login.jsx";
import Registrazione from "../component/Registrazione.jsx";
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <BarraNera />
            <NavbarPrincipale />
          </>
        }
      />
      <Route
        path="/login"
        element={
          <>
            <Login></Login>
          </>
        }
      />
      <Route
        path="/registrazione"
        element={
          <>
            <Registrazione />
          </>
        }
      />
    </Routes>
  );
}

export default App;
