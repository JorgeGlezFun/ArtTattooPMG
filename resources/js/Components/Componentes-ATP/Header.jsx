import "../../../css/app.css"
import logo from "../../../img/Logo-Fondo/Logo-p.svg"
import { Link } from '@inertiajs/react';

function Header() {

    return (
      <>
        <header className="w-screen bg-black">
          <nav>
            <Link to="/" className="LogoCabecera"><img src={logo} alt="Logo Cabecera"/></Link>
            <Link to="/">Inicio</Link>
            <Link to="/SobreNosotros">Sobre Nosotros</Link>
            <Link to="/Galeria">Galería</Link>
            <Link to="/Eventos">Eventos</Link>
            <Link to="/Reservar">Reservar Cita</Link>
          </nav>
        </header>
      </>
    )
  }

export default Header
