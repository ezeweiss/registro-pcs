import React from "react";
import Equipos from "./componentes/Equipos/equipos";
import Navbar from "./componentes/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./componentes/NotFound/NotFound";
import TablaIPNoUsadas from "./componentes/TablaIPNoUsadas/TablaIPNoUsadas";



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Equipos />} />
        <Route path='ip-no-usadas' element={<TablaIPNoUsadas />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
