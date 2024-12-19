import React from 'react';
import Header from '@/Components/Componentes-ATP/HeaderAdmin';
import { Head } from '@inertiajs/react';

const Show = ({ auth, estacion }) => {
    return (
        <>
            <Head title="Detalles de la Estación" />
            <Header user={auth.user} />
            <div className='mainAdmin'>
                <div className="contenedorReserva">
                    <h1 className="titulo">Detalles de la Estación</h1>
                    <hr className="separadorFormulario"/>
                    <div className='flex space-x-24 w-full'>
                        <div className='flex flex-col space-y-16'>
                            <div className='detallesReserva'>
                                <div>
                                    <p><strong>Estación:</strong> {estacion.nombre}</p>
                                    <p><strong>Horas:</strong></p>
                                    <ul>
                                        {estacion.horas.map((horario) => (
                                            <li key={horario.id}>{horario.hora}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className='w-full h-full flex justify-end items-end'>
                                <a href={route('estaciones.index')} className='botonShow'>Volver</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Show;
