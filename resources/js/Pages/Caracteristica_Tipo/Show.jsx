import React from 'react';
import Header from '@/Components/Componentes-ATP/HeaderAdmin';
import { Head } from '@inertiajs/react';

const Show = ({ auth, caracteristica_tipos }) => {
    return (
        <>
            <Head title="Detalles del tipo de característica" />
            <Header user={auth.user} />
            <div className='mainAdmin'>
                <div className="contenedorReserva">
                    <h1 className="titulo">Detalles del tipo de característica</h1>
                    <hr className="separadorFormulario"/>
                    <div className='flex space-x-24 w-full'>
                        <div className='flex flex-col space-y-16'>
                            <div className='detallesReserva'>
                                <div>
                                    <p><strong>Nombre:</strong> {caracteristica_tipos.nombre}</p>
                                </div>
                            </div>
                            <div className='w-full h-full flex justify-end items-end'>
                                <a href={route('caracteristica_tipo.index')} className='botonShow'>Volver</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Show;
