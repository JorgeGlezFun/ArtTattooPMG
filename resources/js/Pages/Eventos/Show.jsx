import React from 'react';
import Header from '@/Components/Componentes-ATP/HeaderAdmin';
import { Head } from '@inertiajs/react';

const Show = ({ auth, evento }) => {

    return (
        <>
            <Head title="Detalles de la Reserva" />
            <Header user={auth.user} />
            <div className='mainAdmin'>
                <div className="contenedorReserva">
                    <h1 className="titulo">Detalles del evento</h1>
                    <hr className="separadorFormulario"/>
                    <div className='flex space-x-24 w-full'>
                        <div className='flex flex-col space-y-16 w-full'>
                            <div className='detallesAdmin'>
                                <div>
                                    <h2>Titulo:</h2>
                                    <p>{evento.titulo}</p>
                                </div>
                            </div>
                            <div className='detallesAdmin'>
                                <div>
                                    <h2>Cuerpo del evento:</h2>
                                    <p>{evento.contenido}</p>
                                </div>
                            </div>
                            <div className='detallesAdmin'>
                                <div>
                                    <h2>Imagen:</h2>
                                    <img src={evento.ruta_imagen} alt={evento.ruta_imagen} className='w-96'/>
                                </div>
                            </div>
                            <div className='w-full h-full flex justify-end items-end'>
                                <a href={route('eventos.index')} className='botonShow'>Volver</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Show;
