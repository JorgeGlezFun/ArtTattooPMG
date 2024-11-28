import React from 'react';
import Header from '@/Components/Componentes-ATP/Header';
import Footer from '@/Components/Componentes-ATP/Footer';
import { Head } from '@inertiajs/react';
import MensajeFlash from '@/Components/Componentes-ATP/MensajeFlash';

const Show = ({ auth, reserva, cliente, tatuaje }) => {

    console.log(tatuaje.ruta_imagen);

    return (
        <>
            <Head title="Detalles de la Reserva" />
            <Header user={auth.user} />
            <div className='main'>
                <div className="contenedorReserva">
                    <h1 className="titulo">Detalles de la Reserva</h1>
                    <hr className="separadorFormulario"/>
                    <div className='detallesReserva'>
                        <h2>Información del Cliente</h2>
                        <p><strong>Nombre:</strong> {cliente.nombre}</p>
                        <p><strong>Apellidos:</strong> {cliente.apellidos}</p>
                        <p><strong>Teléfono:</strong> {cliente.telefono}</p>
                        <p><strong>Email:</strong> {cliente.email}</p>

                        <h2>Detalles del Tatuaje</h2>
                        <p><strong>Tamaño:</strong> {tatuaje.tamano}</p>
                        <p><strong>Relleno:</strong> {tatuaje.relleno}</p>
                        <p><strong>Color:</strong> {tatuaje.color}</p>
                        <p><strong>Zona del Cuerpo:</strong> {tatuaje.zona}</p>
                        {tatuaje.ruta_imagen && (
                            <div>
                                <strong>Imagen de Referencia:</strong>
                                <img src={tatuaje.ruta_imagen} alt={tatuaje.ruta_imagen} className='previewImagen' />
                            </div>
                        )}

                        <h2 className='text-2xl'>Detalles de la Reserva</h2>
                        <p><strong>Artista:</strong> {reserva.artista.nombre}</p>
                        <p><strong>Fecha:</strong> {new Date(reserva.fecha).toLocaleDateString()}</p>
                        <p><strong>Hora de Inicio:</strong> {reserva.hora_inicio}</p>
                        <p><strong>Hora de Fin:</strong> {reserva.hora_fin}</p>
                        <p><strong>Duración Estimada:</strong> {reserva.duracion} hora/s</p>
                        <p><strong>Precio de la Señal:</strong> {reserva.tatuaje.precio}€</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Show;
