import React from 'react';
import Header from '@/Components/Componentes-ATP/HeaderAdmin';
import { Head } from '@inertiajs/react';

const Show = ({ auth, reserva, cliente, tatuaje }) => {

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
                    <h1 className="titulo">Detalles de la Reserva</h1>
                    <hr className="separadorFormulario"/>
                    <div className='flex space-x-24 w-full'>
                        {tatuaje.ruta_imagen && (
                            <div className='border-8 border-solid border-black rounded-md'>
                                <img src={tatuaje.ruta_imagen} alt={tatuaje.ruta_imagen} className='previewImagen' />
                            </div>
                        )}
                        <div className='flex flex-col space-y-16'>
                            <div className='detallesReserva'>
                                <div>
                                    <h2>Información del Cliente</h2>
                                    <p><strong>Nombre:</strong> {cliente.nombre}</p>
                                    <p><strong>Apellidos:</strong> {cliente.apellidos}</p>
                                    <p><strong>Teléfono:</strong> {cliente.telefono}</p>
                                    <p><strong>Email:</strong> {cliente.email}</p>
                                </div>
                                <div>
                                    <h2>Detalles del Tatuaje</h2>
                                    <p><strong>Tamaño:</strong> {tatuaje.tamano}</p>
                                    <p><strong>Relleno:</strong> {tatuaje.relleno}</p>
                                    <p><strong>Color:</strong> {tatuaje.color}</p>
                                    <p><strong>Zona del Cuerpo:</strong> {tatuaje.zona}</p>
                                </div>
                                <div className='w-fit'>
                                    <h2>Detalles de la Reserva</h2>
                                    <p><strong>Artista:</strong> {reserva.artista.nombre}</p>
                                    <p><strong>Fecha:</strong> {formatearFecha(reserva.fecha)}</p>
                                    <p><strong>Hora de Inicio:</strong> {reserva.hora_inicio.substring(0, 5)}</p>
                                    <p><strong>Hora de Fin:</strong> {reserva.hora_fin.substring(0, 5)}</p>
                                    {reserva.duracion > 1 ? <p><strong>Duración Estimada:</strong> {reserva.duracion} horas</p> : <p><strong>Duración Estimada:</strong> {reserva.duracion} hora</p>}
                                    <p><strong>Precio de la Señal:</strong> {reserva.tatuaje.precio}€</p>
                                </div>
                            </div>
                            <div className='w-full h-full flex justify-end items-end'>
                                <a href={route('reservas.index')} className='botonShow'>Volver</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Show;
