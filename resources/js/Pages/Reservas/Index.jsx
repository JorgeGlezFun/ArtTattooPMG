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
    const [reservasState, setReservasState] = useState(reservas);

    const confirmarEliminacionReserva = () => {
        setConfirmandoEliminacionReserva(true);
    };

    const mensajeConfirmacionActivo = () => {
        setMensajeConfirmacion(true);
    };

    const closeMensaje = () => {
        setMensajeConfirmacion(false);
    };

    const closeModal = () =>{
        setConfirmandoEliminacionReserva(false);
    };

    // Obtener el token CSRF
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const handleDelete = async (id) => {
            setMensajeConfirmacion(true);
            try {
                await axios.delete(`/reservas/${id}`, {
                    headers: {
                        'X-CSRF-Token': csrfToken,
                    },
                });

                setReservasState(prevReservas => prevReservas.filter(reserva => reserva.id !== id));
            } catch (error) {
                console.error('Error al eliminar la reserva:', error);
                alert('Error al eliminar la reserva. Intenta de nuevo más tarde.');
            }
    };



    return (
        <>
            <Head title="Reservas"/>
            <HeaderAdmin user={auth.user}/>
            <div className='mainAdmin'>
                <div>
                    <h1 className='text-3xl'>Reservas</h1>

                    <table className='bg-white border-solid border-2 border-black'>
                        <thead>
                            <tr className='border-solid border-2 border-black'>
                                <th>ID Reserva</th>
                                <th>Tatuaje</th>
                                <th>Cliente</th>
                                <th>Artista</th>
                                <th>Fecha</th>
                                <th>Hora de inicio</th>
                                <th>Hora de fin</th>
                                <th>Duración</th>
                                <th>Precio</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservasState.length > 0 ? (
                                reservasState.map((reserva) => (
                                    <tr key={reserva.id} className='border-solid border-2 border-black'>
                                        <td><a href="">{reserva.id}</a></td>
                                        <td><img src={reserva.tatuaje.ruta_imagen} alt="Imagen del tatuaje" className='w-20 h-20'/></td>
                                        <td>{reserva.cliente.nombre}</td>
                                        <td>{reserva.artista.nombre}</td>
                                        <td>{reserva.fecha}</td>
                                        <td>{reserva.hora_inicio.substring(0, 5)}</td>
                                        <td>{reserva.hora_fin.substring(0, 5)}</td>
                                        <td>{reserva.duracion} hora/s</td>
                                        <td>{reserva.tatuaje.precio}€</td>
                                        <td className='p-0'>
                                            <div className='flex flex-row p-0 h-full'>
                                                <a href={`/reservas/${reserva.id}`} className='w-full h-full inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 active:bg-blue-700 transition ease-in-out duration-150'>Ver</a>
                                                <a href={`/reservas/${reserva.id}/edit`} className='w-full h-full inline-flex items-center px-4 py-2 bg-yellow-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-yellow-500 active:bg-yellow-700 transition ease-in-out duration-150'>Editar</a>
                                                <DangerButton className='w-full h-full' onClick={confirmarEliminacionReserva}>Eliminar</DangerButton>
                                                <Modal show={confirmandoEliminacionReserva} onClose={closeModal}>
                                                    <div className='p-6'>
                                                        <h2 className="text-lg font-medium text-gray-900">
                                                            ¿Estás seguro de que quieres borrar la reserva?
                                                        </h2>

                                                        <div className="mt-6 flex justify-end">
                                                            <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>
                                                            <DangerButton onClick={()=>{handleDelete(reserva.id)}} className="ms-3">
                                                                Eliminar
                                                            </DangerButton>
                                                        </div>
                                                    </div>
                                                </Modal>
                                                <Modal show={mensajeConfirmacion} onClose={closeMensaje}>
                                                    <div className='p-8 flex flex-col items-center'>
                                                        <div className='w-full flex items-right'>
                                                            <SecondaryButton className='text-black flex justify-center'onClick={closeMensaje}>x</SecondaryButton>
                                                        </div>
                                                        <h2 className="text-3xl font-medium text-gray-900 p-6 w-full text-center">
                                                            Reserva eliminada con éxito.
                                                        </h2>
                                                    </div>
                                                </Modal>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10" className="text-center">No hay reservas.</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                </div>
            </div>
        </>
    );
};

export default Index;
