import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../Components/Componentes-ATP/Header';
import Inicio from '../Components/Componentes-ATP/Inicio'
import Footer from '../Components/Componentes-ATP/Footer';
import '../../css/app.css';

function Index() {

  return (
      <Router>
          <Header />
          {/* <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/SobreNosotros" element={<SobreNosotros />} />
              <Route path="/Galeria" element={<Galeria />} />
              <Route path="/Eventos" element={<Eventos />} />
              <Route path="/Reservar" element={<Reservar />} />
          </Routes> */}
          <Inicio />
          <Footer />
      </Router>
  );
}

export default Index;
