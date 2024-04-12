import "../../../css/app.css"
import logo from "../../../img/Logo-Fondo/Logo.png"

function Inicio() {

    return (
      <>
        <main>
            <div>
                <img src={logo} alt="Logo ArtTattooPMG" className="Logo"/>
                <div className="info">
                    <h1>BIENVENIDOS A LA WEB DE ARTTATTOOPMG</h1>
                    <hr/>
                    <p>
                        Aquí encontrarás un lugar donde los mejores profesionales te atenderán para realizar los tatuajes que
                        tengas pensado.<br/>
                        <br/>
                        Para concertar una cita, puedes ir a la pestaña de “Reservar Tu Cita”, donde encontraras a tu
                        disposición todas las herramientas para poder tener una cita en nuestro estudio.<br/>
                        <br/>
                        También puedes informarte sobre los próximos eventos en los que participaremos, así como ver nuestra
                        galería, que consiste en los trabajos que hemos realizado, o bien informarte acerca de nuestro equipo e
                        instalaciones.<br/>
                        <br/>
                        Muchas gracias por su visita.
                    </p>
                    <a href="" className="boton">Reserva Tu Cita</a>
                </div>
            </div>
        </main>
      </>
    )
  }

export default Inicio
