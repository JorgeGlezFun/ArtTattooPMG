import React from 'react';
import Header from '@/Components/Componentes-ATP/HeaderAdmin';
import { Head } from '@inertiajs/react';

const Show = ({ auth, descanso }) => {

    const formatearFecha = (fecha) => {
        const fechaFormateada = new Date(fecha);
        return fechaFormateada.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <>
            <Head title="Detalles de la Reserva" />
            <Header user={auth.user} />
            <div className='mainAdmin'>
                <div className="contenedorReserva">
                    <h1 className="titulo">Detalles del descanso</h1>
                    <hr className="separadorFormulario"/>
                    <div className='flex space-x-24 w-full'>
                        <div className='flex flex-col space-y-16'>
                            <div className='detallesReserva'>
                                <div>
                                    <p><strong>Descanso:</strong> {formatearFecha(descanso.fecha)}</p>
                                </div>
                            </div>
                            <div className='w-full h-full flex justify-end items-end'>
                                <a href={route('descansos.index')} className='botonShow'>Volver</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Show;
