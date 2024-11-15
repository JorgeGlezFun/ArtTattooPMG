import Header from '@/Components/Componentes-ATP/Header';
import Footer from '@/Components/Componentes-ATP/Footer';
import logo from "../../img/Carteles-eventos/Cartel-bodas.jpg"
import { Head, Link } from '@inertiajs/react';

export default function Eventos({ auth }) {
    const carteles = [logo, logo, logo, logo, logo, logo, logo, logo, logo, logo, logo, logo];

    return (
        <>
            <Head title="Eventos" />
            <Header user={auth.user} />
            <div className='mainEventos'>
                <div className="contenedorEventos">
                    <div className='infoEventos'>
                        <h1 className='titulo'>Eventos</h1>
                        <hr className='separadorEventos'/>
                        <p className='textoEventos'>
                            Bienvenidos a la sección de eventos, en esta página podrás informarte de los eventos que se llevarán a cabo, de las noticias acerca de nuestra marca, así como de las ofertas, descuentos y sorteos que realizaremos.
                            <br />
                            Para ver en detalle un evento pulsa sobre él.
                        </p>
                    </div>
                    <div class='contenedorImagenesEventos'>
                        <div class='imagenesEventos'>
                            {carteles.map((imagen, index) => (
                                <div key={index} className='contenedorImagenEvento'>
                                    <Link href="#" className=''>
                                        <img
                                            src={imagen}
                                            alt={`Imagen ${index}`}
                                            className='imagenEvento'
                                        />
                                        <span className='nombreImagen'>
                                            Nombre de la Imagen {index + 1}
                                        </span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
