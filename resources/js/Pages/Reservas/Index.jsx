import React, { useState } from 'react';
import HeaderAdmin from '@/Components/Componentes-ATP/HeaderAdmin';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import { Head } from '@inertiajs/react';
import axios from 'axios';

const Index = ({ auth, reservas }) => {
    const [confirmandoEliminacionReserva, setConfirmandoEliminacionReserva] = useState(false);
    const [mensajeConfirmacion, setMensajeConfirmacion] = useState(false);
    const [reservaAEliminar, setReservaAEliminar] = useState(null);
    const [reservasState, setReservasState] = useState(reservas);

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const confirmarEliminacionReserva = (id) => {
        setReservaAEliminar(id);
        setConfirmandoEliminacionReserva(true);
    };

    const closeModal = () => {
        setConfirmandoEliminacionReserva(false);
        setReservaAEliminar(null);
    };

    const closeMensaje = () => {
        setMensajeConfirmacion(false);
    };

    const handleDelete = async () => {
        if (!reservaAEliminar) return;

        try {
            await axios.delete(`/reservas/${reservaAEliminar}`, {
                headers: {
                    'X-CSRF-Token': csrfToken,
                },
            });

            setReservasState(prevReservas => prevReservas.filter(reserva => reserva.id !== reservaAEliminar));
            setMensajeConfirmacion(true);
            console.log('Reserva eliminada con éxito.');
        } catch (error) {
            console.error('Error al eliminar la reserva:', error);
            alert('Error al eliminar la reserva. Intenta de nuevo más tarde.');
        } finally {
            closeModal();
        }
    };

    const formatearFecha = (fecha) => {
        const fechaFormateada = new Date(fecha);
        return fechaFormateada.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <>
            <Head title="Reservas" />
            <HeaderAdmin user={auth.user} />
            <div className='mainAdmin'>
                <div className=''>
                    <h1 className='text-4xl'>Reservas</h1>
                    {reservasState.length > 0 ? (
                        <table className='tablaAdmin'>
                            <thead>
                                <tr className=''>
                                    <th>ID Reserva</th>
                                    <th>Estado</th>
                                    <th>Tatuaje</th>
                                    <th className='w-40'>Cliente</th>
                                    <th className='w-40'>Artista</th>
                                    <th>Fecha</th>
                                    <th> Hora de inicio</th>
                                    <th className='w-fit'>Hora de fin</th>
                                    <th>Características</th>
                                    <th>Duración</th>
                                    <th>Precio</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservasState.map((reserva) => (
                                    <tr key={reserva.id}>
                                        <td>{reserva.id}</td>
                                        <td>{reserva.estado}</td>
                                        <td className='p-0'><img src={reserva.tatuaje.ruta_imagen} alt="Imagen del tatuaje" className='w-36 h-36' /></td>
                                        <td>{reserva.cliente.nombre}</td>
                                        <td>{reserva.artista.nombre}</td>
                                        <td>{formatearFecha(reserva.fecha)}</td>
                                        <td className='horaAdmin'>{reserva.hora_inicio.substring(0, 5)}</td>
                                        <td className='horaAdmin'>{reserva.hora_fin.substring(0, 5)}</td>
                                        <td>
                                            {reserva.tatuaje.caracteristicas.length > 0 ? (
                                                reserva.tatuaje.caracteristicas.map((caracteristica) => (
                                                    <span key={caracteristica.id}>{caracteristica.nombre}{', '}</span>
                                                ))
                                            ) : (
                                                <span>No hay características</span>
                                            )}
                                        </td>
                                        {reserva.duracion > 1 ? <td>{reserva.duracion} horas</td> : <td>{reserva.duracion} hora</td>}
                                        <td>{reserva.tatuaje.precio}€</td>
                                        <td className='p-0'>
                                            <div className='flex flex-col p-0 h-full'>
                                                <a href={`/reservas/${reserva.id}`} className='w-full h-full inline-flex items-center text-center px-4 py-[0.9225rem] bg-blue-600 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 active:bg-blue-700 transition ease-in-out duration-150'>Ver</a>
                                                <a href={`/reservas/${reserva.id}/edit`} className='w-full h-full inline-flex items-center px-4 py-[0.9225rem] bg-yellow-600 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-yellow-500 active:bg-yellow-700 transition ease-in-out duration-150'>Editar</a>
                                                <DangerButton className='w-full h-full rounded-none py-[0.9225rem]' onClick={() => confirmarEliminacionReserva(reserva.id)}>Eliminar</DangerButton>
                                                <Modal show={confirmandoEliminacionReserva} onClose={closeModal}>
                                                    <div className='p-6'>
                                                        <h2 className="text-lg font-medium text-gray-900">
                                                            ¿Estás seguro de que quieres borrar la reserva?
                                                        </h2>
                                                        <div className="mt-6 flex justify-end">
                                                            <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>
                                                            <DangerButton onClick={handleDelete} className="ms-3">
                                                                Eliminar
                                                            </DangerButton>
                                                        </div>
                                                    </div>
                                                </Modal>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <h1 colSpan="10" className="text-center">No hay reservas.</h1>
                    )}
                </div>
            </div>
        </>
    );
};

export default Index;
