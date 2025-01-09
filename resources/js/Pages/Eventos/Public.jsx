import React, { useState } from 'react';
import Header from '@/Components/Componentes-ATP/Header';
import Footer from '@/Components/Componentes-ATP/Footer';
import { Head, Link } from '@inertiajs/react';

export default function Eventos({ auth, eventos }) {
    const [eventoState, setEventoState] = useState(eventos.data);
    console.log(eventos.data);
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
                    {eventoState.length > 0 && (
                        <div className='contenedorImagenesEventos'>
                            <div className='imagenesEventos'>
                                {eventoState.map((evento) => (
                                    <div key={evento.id} className='contenedorImagenEvento'>
                                        <Link href={`/evento/${evento.id}`} className='flex items-center justify-center'>
                                            <img
                                                src={evento.ruta_imagen}
                                                alt={`Imagen de ${evento.titulo}`}
                                                className='imagenEvento'
                                            />
                                            <p className='nombreImagen'>
                                                {evento.titulo}
                                            </p>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {eventoState.length > 0 && (
                        <div className="pagination">
                            {eventos.links.map((link) => (
                                <Link key={link.label} href={link.url} className={link.active ? 'paginationActive' : ''}>
                                    {link.label === '&laquo; Previous' ? 'Anterior' : link.label === 'Next &raquo;' ? 'Siguiente' : link.label}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
