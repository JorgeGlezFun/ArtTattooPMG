import React, { useState } from 'react';
import Header from '@/Components/Componentes-ATP/Header';
import Footer from '@/Components/Componentes-ATP/Footer';
import { Head, Link } from '@inertiajs/react';
import ModalImage from "react-modal-image";

export default function Galeria({ auth, galerias }) {
    const [galeriaState, setGaleriaState] = useState(galerias.data);
    console.log(galerias.data);
    return (
        <>
            <Head title="Galeria" />
            <Header user={auth.user} />
            <div className='main'>
                <div className="contenedorGaleria">
                    <div className='infoGaleria'>
                        <h1 className='titulo'>Galería</h1>
                        <hr className='separadorSN'/>
                        <p className='textoGaleria'>
                            Bienvenido a la galeria de nuestro estudio. Aquí podrás encontrar una muestra de los trabajos que hemos realizado, ya sean tatuajes o piercings. <br />
                            Si te interesa alguno de los trabajos que ves aquí, no dudes en contactarnos para agendar una cita.
                        </p>
                    </div>
                    <div className='contenedorImagenesGaleria'>
                        <div className='imagenesLightbox'>
                            {galeriaState.length > 0 && (
                                galeriaState.map((galeria) => (
                                    <div key={galeria.id} className='contenedorImagenGaleria'>
                                        <ModalImage
                                            small={galeria.ruta_imagen}
                                            large={galeria.ruta_imagen}
                                            hideDownload={true}
                                            alt={`Imagen de ${galeria.titulo}`}
                                            className='imagenGaleria'
                                        />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    {galeriaState.length > 0 && (
                        <div className="pagination">
                            {galerias.links.map((link) => (
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
