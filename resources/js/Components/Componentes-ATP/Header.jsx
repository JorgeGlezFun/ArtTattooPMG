import "../../../css/app.css"
import logo from "../../../img/Logo-Fondo/Logo-p.svg"
import { Link } from '@inertiajs/react';

function Header() {

    return (
      <>
        <header>
          <nav>
            <Link to="/" className="FondoCabecera"><img src={logo} alt="Logo Cabecera" className="LogoCabecera"/></Link>
            <Link to="/">Inicio</Link>
            <Link to="/SobreNosotros">Sobre Nosotros</Link>
            <Link to="/Galeria">Galería</Link>
            <Link to="/Eventos">Eventos</Link>
            <Link to="/Reservar">Reservar Cita</Link>
            <input type="checkbox" name="menu" id="menu" className="hidden" />
            <label htmlFor="menu" className="burger"> ☰ </label>
            <div className="menu">
                <ul className="menuHamburguesa">
                    <li><Link>Inicio</Link></li>
                    <li><Link>Sobre Nosotros</Link></li>
                    <li><Link>Galeria</Link></li>
                    <li><Link>Eventos</Link></li>
                    <li><Link>Reservar Cita</Link></li>
                </ul>
            </div>
          </nav>
        </header>
      </>
    )
  }

export default Header
