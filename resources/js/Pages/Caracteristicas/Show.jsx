import React from 'react';
import Header from '@/Components/Componentes-ATP/HeaderAdmin';
import { Head } from '@inertiajs/react';

const Show = ({ auth, caracteristica }) => {
    return (
        <>
            <Head title="Detalles de la caracteristica" />
            <Header user={auth.user} />
            <div className='mainAdmin'>
                <div className="contenedorReserva">
                    <h1 className="titulo">Detalles de la caracteristica</h1>
                    <hr className="separadorFormulario"/>
                    <div className='flex space-x-24 w-full'>
                        <div className='flex flex-col space-y-16'>
                            <div className='detallesReserva'>
                                <div>
                                    <p><strong>Tipo:</strong> {caracteristica.nombre}</p>
                                    <p><strong>Nombre:</strong> {caracteristica.nombre}</p>
                                    <p><strong>Precio:</strong> {caracteristica.nombre}</p>
                                    <p><strong>Tiempo:</strong> {caracteristica.nombre}</p>
                                </div>
                            </div>
                            <div className='w-full h-full flex justify-end items-end'>
                                <a href={route('caracteristicas.index')} className='botonShow'>Volver</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Show;
