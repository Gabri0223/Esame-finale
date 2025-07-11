import { useState } from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import NavbarPrincipale from "../component/NavbarPrincipale.jsx";
import BarraNera from "../component/BarraNera.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

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
    </Routes>
  );
}

export default App;
