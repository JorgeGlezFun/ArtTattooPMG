import Header from '@/Components/Componentes-ATP/Header';
import Footer from '@/Components/Componentes-ATP/Footer';
import { Link, Head } from '@inertiajs/react';
import logoRecortado from "../../img/Logo-Fondo/Logo-recortado.png"
import artista from "../../img/Carteles-eventos/Tatuadora-tatuando-convencion-2-recortado.jpeg"
import artistaMovil from "../../img/Carteles-eventos/Tatuadora-tatuando-convencion-2.jpeg"
import estudio from "../../img/Fotos-estudio/Entrada-estudio-recortado.jpeg"
// import estudioMovil from "../../../img/Fotos-estudio/Entrada-estudio-recortado.jpeg"
import trabajo from "../../img/Tatuajes/Normales/prueba.jpeg"
import trabajoMovil from "../../img/Tatuajes/Normales/Normal-2-recortado.jpeg"

export default function SobreNosotros() {

    return (
      <>
      <Head title='Sobre Nosotros'/>
        <Header/>
            <div className='main'>
                <div className="SobreNosotros">
                    <div className="infoSN">
                        <h1 className="titulo">¿Quiénes somos?</h1>
                        <hr className="separadorSN"/>
                        <div className="contenedor">
                            <p className="textoSN">
                            ArtTattooPMG es un negocio dedicado al mundo de los tatuajes y perforaciones, donde los mejores profesionales plasmarán en tu piel tus ideas de tatuaje y/o piercings. <br />
                            <br />
                            Aquí podrás encontrar una gran variedad de estilos de tatuaje que se adecuen a la idea que tienes en mente, así como de diversos métodos de perforación para realizarte el piercing que deseas. <br />
                            <br />
                            No esperes mas y reserva ya tu cita para concertar tu próximo tatuaje/piercing. <br />
                            <br />
                            ¡Te esperamos!
                            </p>
                            <img src={logoRecortado} alt="Logo" className="logoSN"/>
                        </div>
                    </div>
                    <div className="infoSN">
                        <h1 className="titulo">La Artista</h1>
                        <hr className="separadorSN"/>
                        <div className="contenedor">
                            <p className="textoSN">
                            Conoce a Patri, nuestra tatuadora.<br />
                            <br />
                            Patri es una joven artista que desde pequeña ha estado presente en el mundo del arte, empezó su negocio en este mundillo con retratos y dibujos varios, hasta que un día encontró el mundo del tatuaje y lleva desde entonces “x” años usando la piel como lienzo para sus obras. <br />
                            <br />
                            Comenzó tatuando a domicilio, llevando a cuestas todo su equipamiento para poder realizar sus obras y dar un paso mas hacía su sueño. <br />
                            Más adelante consiguió asentarse en casa de un familiar para poder realizar de forma mas cómoda sus obras, hasta que con esfuerzo y perseverancia, ha conseguido su propio local desde el cual, orgullosa de ello, realiza con pasión y dedicación los tatuajes que le encargan. <br />
                            <br />
                            Patri se especializa en tatuajes de línea fina, microrealismo y puntillismo, pero esto no la detiene en realizar todo tipo de tatuajes.<br />
                            <br />
                            Su formación dentro de este mundillo es la siguiente:
                            <ul className="listaSN">
                                <li>Título homologado en maquillaje integral</li>
                                <li>Titulo homologado de tatuajes</li>
                                <li>Título de piercings proporcionado por la escuela Yanni Piercings</li>
                            </ul>
                            <br />
                            “Todo tiene un comienzo, que esto no es un don ni es fácil, todo es aprender, empeñarse y poner esfuerzo en lo que realmente te gusta.” .- Patri.
                            </p>
                            <img src={artista} alt="Foto de la tatuadora tatuando en la Tattoo Convention de Jerez" className="artistaSN"/>
                            <img src={artistaMovil} alt="Foto de la tatuadora tatuando en la Tattoo Convention de Jerez" className="artistaMovilSN"/>
                        </div>
                    </div>
                    <div className="infoSN">
                        <h1 className="titulo">El Estudio</h1>
                        <hr className="separadorSN"/>
                        <div className="contenedor">
                            <p className="textoSN">
                            Nuestro estudio se encuentra situado en Avda. cangas, 79, 41740 Lebrija, Sevilla. <br />
                            <br />
                            Es un estudio pequeño donde te sentirás acogido nada más entrar, con una decoración que se basa en los múltiples cuadros y retratos creados por nuestra artista y tatuadora. <br />
                            <br />
                            El estudio consta de una recepción, una zona de trabajo, y el baño. <br />
                            <br />
                            Actualmente la capacidad del estudio es pequeña, pudiendo solo entrar el cliente y el tatuador. <br />
                            <br />
                            También contamos con una serie de normas que hay que cumplir de forma estricta, para así facilitar el trabajo de nuestros artistas, así como de garantizar un espacio tranquilo y seguro para el cliente. <br />
                            <br />
                            Dichas normas son las siguientes:
                            <ul className="listaSN">
                                <li>No venir con acompañante.</li>
                                <li>No se permite la entrada a niños.</li>
                                <li>No tocar las decoraciones del estudio.</li>
                                <li>No se permiten mascotas.</li>
                                <li>No causar ruido excesivo.</li>
                            </ul>
                            </p>
                            <img src={estudio} alt="Foto del estudio de tatuajes por dentro" className="estudioSN"/>
                        </div>
                    </div>
                    <div className="infoSN">
                        <h1 className="titulo">Nuestros Trabajos</h1>
                        <hr className="separadorSN"/>
                        <div className="contenedor ">
                            <p className="textoSN">
                                En ArtTattooPMG realizamos una gran variedad de trabajos, tanto de diseños propios como de aquellos que nos traen nuestros clientes. <br />
                                <br />
                                Entre todos esos diseños queremos destacar los que son la especialidad de nuestra artista, que son los tatuajes de linea fina, microrealismo y los tatuajes con puntillismo. <br />
                                <br />
                                Adémas de los diseños propios de la artista o del cliente, se realizan covers de tatuajes, para renovar el tatuaje viejo que te hiciste hace tiempo y ahora luce desgastado, o bien para tapar aquel tatuaje que te hiciste por tu ex. <br />
                                <br />
                                Para ver en profundidad los trabajos realizados en nuestro estudio, puedes dirigirte a la pestaña de galería, donde podrás ver de forma detallada, los tatuajes que se han hecho los clientes. <br />
                                <br />
                                Pero aquí no acaba la cosa, en ArtTattooPMG no solo se realizan tatuajes, también nos hemos abierto al mundo de las perforaciones. <br />
                                Y es que ahora puedes disfrutar de realizarte el piercing que siempre has deseado, todo esto gracias a la profesionalidad de nuestros trabajadores y a sus conocimientos la realizacion de perforaciones. <br />
                                <br />
                                No esperes más y reserva tu cita yendo a la pestaña de "Reservar Cita" o bien poniendote en contacto con el número que puedes encontrar en nuestras redes sociales y pie de página.
                                <br />
                                <br />
                                ¡Te esperamos!
                            </p>
                            <img src={trabajo} alt="Tatuaje corazon" className="trabajosSN"/>
                            <img src={trabajoMovil} alt="Tatuaje ojos de tigre" className="trabajoMovilSN"/>
                        </div>
                    </div>
                </div>
            </div>
        <Footer/>
      </>
    )
  }
