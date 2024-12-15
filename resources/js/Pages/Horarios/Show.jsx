import React from 'react';
import Header from '@/Components/Componentes-ATP/HeaderAdmin';
import { Head } from '@inertiajs/react';

const Show = ({ auth, horario }) => {

    return (
        <>
            <Head title="Detalles de la Reserva" />
            <Header user={auth.user} />
            <div className='mainAdmin'>
                <div className="contenedorReserva">
                    <h1 className="titulo">Detalles del horario</h1>
                    <hr className="separadorFormulario"/>
                    <div className='flex space-x-24 w-full'>
                        <div className='flex flex-col space-y-16'>
                            <div className='detallesReserva'>
                                <div>
                                    <h2>Información del Cliente</h2>
                                    <p><strong>Estación:</strong> {horario.estacion}</p>
                                    <p><strong>Horas:</strong> {horario.horas}</p>
                                </div>
                            </div>
                            <div className='w-full h-full flex justify-end items-end'>
                                <a href={route('horarios.index')} className='botonShow'>Volver</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Show;
