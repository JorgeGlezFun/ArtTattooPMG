import React from 'react';
import Header from '../Components/Componentes-ATP/Header';
import Inicio from '../Components/Componentes-ATP/Inicio'
import SobreNosotros from '../Components/Componentes-ATP/SobreNosotros'
import Footer from '../Components/Componentes-ATP/Footer';

export default function Index() {

  return (
      <>
        <Header />
            {/* <Inicio /> */}
            <SobreNosotros />
        <Footer />
      </>
  );
}
