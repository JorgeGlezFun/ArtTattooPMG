import Header from '@/Components/Componentes-ATP/Header';
import Footer from '@/Components/Componentes-ATP/Footer';
import logo from "../../img/Carteles-eventos/Cartel-jerez.jpg"
import { Head } from '@inertiajs/react';

export default function Eventos({ auth }) {
    const carteles = [logo, logo, logo, logo, logo, logo, logo, logo, logo, logo, logo, logo];

    return (
        <>
            <Head title="ArtTattooPMG - Eventos " />
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
                    <div className='contenedorImagenesEventos'>
                        <div className='imagenesEventos'>
                            {carteles.map((imagen, index) => (
                                <div key={index} className='contenedorImagenEvento'>
                                    <a href="#">
                                        <img
                                            src={imagen}
                                            alt={`Imagen ${index}`}
                                            className='imagenEvento'
                                        />
                                    </a>
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
