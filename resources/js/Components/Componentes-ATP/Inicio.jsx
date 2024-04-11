import "../../../css/app.css"
import logo from "../../../img/Logo-Fondo/Logo.png"
import { Link } from 'react-router-dom';

function Inicio() {

    return (
      <>
        <main>
            <div>
                <img src={logo} alt="Logo ArtTattooPMG" className="Logo"/>
            </div>
        </main>
      </>
    )
  }

export default Inicio
