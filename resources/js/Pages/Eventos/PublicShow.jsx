import React, { useState } from 'react';
import Header from '@/Components/Componentes-ATP/Header';
import Footer from '@/Components/Componentes-ATP/Footer';
import { Head, Link } from '@inertiajs/react';

export default function Eventos({ auth, evento }) {
    console.log(evento)
    return (
        <>
            <Head title="Eventos" />
            <Header user={auth.user} />
            <div className='mainEventosShow'>
                <div className='divEventoShow'>
                    <img
                        src={evento.ruta_imagen}
                        alt={`Imagen de ${evento.titulo}`}
                        className='imagenEventosShow'
                    />
                </div>
                <div className="contenedorEventosShow">
                    <div className='infoEventosShow'>
                        <h1 className='titulo'>{evento.titulo}</h1>
                        <hr className='separadorEventos'/>
                        <p className='textoEventosShow'>
                            {evento.contenido}
                        </p>
                        <div className='flex justify-end items-end'>
                            <Link href='/evento' className='botonEventoShow'>Volver</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
