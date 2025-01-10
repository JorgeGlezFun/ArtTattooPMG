import React from 'react';
import Header from '@/Components/Componentes-ATP/HeaderAdmin';
import { Head } from '@inertiajs/react';

const Show = ({ auth, artista }) => {
    return (
        <>
            <Head title="Detalles de la Estación" />
            <Header user={auth.user} />
            <div className='mainAdmin'>
                <div className="contenedorReserva">
                    <h1 className="titulo">Detalles del artista</h1>
                    <hr className="separadorFormulario"/>
                    <div className='flex flex-col w-full'>
                        <div className='flex flex-col space-y-16'>
                            <div className='detallesUsuario'>
                                <div>
                                    <p><strong>Id Artista:</strong> {artista.id}</p>
                                    <p><strong>Nombre:</strong> {artista.nombre}</p>
                                    <p><strong>Apellidos:</strong> {artista.apellidos}</p>

                                </div>
                            </div>
                        </div>
                        <div className='w-full h-full flex justify-end items-end'>
                            <a href={route('artistas.index')} className='botonShow'>Volver</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Show;
