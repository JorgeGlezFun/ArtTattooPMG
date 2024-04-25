import "../../../css/appSN.css"
import logo from "../../../img/Logo-Fondo/Logo.png"
import artista from "../../../img/Carteles-eventos/Tatuadora-tatuando-convencion-2-recortado.jpeg"
import estudio from "../../../img/Fotos-estudio/Entrada-estudio.jpeg"
import trabajo from "../../../img/Tatuajes/Normales/Normal-12-byn.jpeg"

export default function SobreNosotros() {

    return (
      <>
        <main>
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
                        <img src={logo} alt="Logo" className="logoSN"/>
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
                        <img src={artista} alt="Logo" className="h-[30.469rem] ml-auto"/>
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
                        <img src={estudio} alt="Logo" className="ml-auto mt-auto h-[25rem] w-auto"/>
                    </div>
                </div>
                <div className="infoSN">
                    <h1 className="titulo">Nuestros Trabajos</h1>
                    <hr className="separadorSN"/>
                    <div className="contenedor">
                        <p className="textoSN">
                        En ArtTattooPMG hacemos una gran variedad de trabajos, entre ellos destacamos los tatuajes de línea fina, microrealistas o con puntillismo. <br />
                        <br />
                        También se realizan covers de tatuajes, para renovar el tatuaje que hace ya tiempo te hiciste y ahora luce desgastado, o bien para tapar aquel tatuaje que te hiciste por tu ex. <br />
                        <br />
                        Para ver en profundidad los trabajos realizados en nuestro estudio, puedes dirigirte a la pestaña de galería, donde podrás ver, de forma detallada, los tatuajes que se han hecho los clientes. <br />
                        <br />
                        Pero eso no es todo, además de realizarte los tatuajes que desees en nuestro estudio, también podrás hacerte los piercings que quieras, ya que, dentro de poco contaremos con el servicio de piercings en nuestro local. <br />
                        </p>
                        <img src={trabajo} alt="Logo" className="logoSN"/>
                    </div>
                </div>
            </div>
        </main>
      </>
    )
  }
