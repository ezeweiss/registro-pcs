import React from "react";
import Equipos from "./componentes/Equipos/equipos";
import Navbar from "./componentes/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./componentes/NotFound/NotFound";
import Switches from "./componentes/Equipos/Switches";
import Telefonos from "./componentes/Equipos/Telefonos";




function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Equipos />} />
        <Route path="/telefonos" element={<Telefonos />} />
        <Route path="/switches" element={<Switches />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
