import { useState } from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import NavbarPrincipale from "../component/NavbarPrincipale.jsx";
import BarraNera from "../component/BarraNera.jsx";
import Login from "../component/Login.jsx";
import Registrazione from "../component/Registrazione.jsx";
import Dettaglio from "../component/Dettaglio.jsx";
import Carrello from "../component/Carrello.jsx";
import PaginaRicerca from "../component/PaginaRicerca.jsx";
import Carosello from "../component/Carosello.jsx";
import Pet from "../component/Pet.jsx";
import Prodotti from "../component/Prodotti.jsx";
import InformazioniNegozio from "../component/InformazioniNegozio.jsx";
import Servizi from "../component/Servizi.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <BarraNera />
            <NavbarPrincipale />
            <Carosello />
            <Pet />
            <Prodotti />
            <InformazioniNegozio />
            <Servizi />
          </>
        }
      />
      <Route
        path="/login"
        element={
          <>
            <Login />
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
      <Route
        path="/dettagli/:id"
        element={
          <>
            <BarraNera />
            <NavbarPrincipale />
            <Dettaglio />
          </>
        }
      />
      <Route
        path="/carrello"
        element={
          <>
            <BarraNera />
            <NavbarPrincipale />
            <Carrello />
          </>
        }
      />
      <Route
        path="/ricerca"
        element={
          <>
            <BarraNera />
            <NavbarPrincipale />
            <PaginaRicerca />
          </>
        }
      />
    </Routes>
  );
}

export default App;
