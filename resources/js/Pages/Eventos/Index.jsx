import React, { useState } from 'react';
import HeaderAdmin from '@/Components/Componentes-ATP/HeaderAdmin';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';

const Index = ({ auth, eventos }) => {
    const [confirmandoEliminacionEvento, setConfirmandoEliminacionEvento] = useState(false);
    const [mensajeConfirmacion, setMensajeConfirmacion] = useState(false);
    const [eventoAEliminar, setEventoAEliminar] = useState(null);
    const [eventoState, setEventoState] = useState(eventos.data);

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const confirmarEliminacionEvento = (id) => {
        setEventoAEliminar(id);
        setConfirmandoEliminacionEvento(true);
    };

    const closeModal = () => {
        setConfirmandoEliminacionEvento(false);
        setEventoAEliminar(null);
    };

    const closeMensaje = () => {
        setMensajeConfirmacion(false);
    };

    const handleDelete = async () => {
        if (!eventoAEliminar) return;

        try {
            console.log('Eliminando evento con ID:', eventoAEliminar);
            const response = await axios.delete(`/eventos/${eventoAEliminar}`, {
                headers: {
                    'X-CSRF-Token': csrfToken,
                },
            });

            if (response.data.success) {
                setEventoState(prevEventos => prevEventos.filter(evento => evento.id !== eventoAEliminar));
                setMensajeConfirmacion(true);
                console.log('Evento eliminada con éxito.');
            } else {
                throw new Error('Error al eliminar la evento.');
            }
        } catch (error) {
            console.error('Error al eliminar la evento:', error);
            alert('Error al eliminar el evento. Intenta de nuevo más tarde.');
        } finally {
            closeModal();
        }
    };

    return (
        <>
            <Head title="Evento" />
            <HeaderAdmin user={auth.user} />
            <div className='mainAdmin'>
                <div>
                    {eventoState.length > 0 ? (
                        <>
                            <div className='w-full flex justify-between mb-2'>
                                <h1 className='text-4xl text-center flex items-center justify-center'>Eventos</h1>
                                <a href={route('eventos.create')} className='w-fit items-center justify-center flex rounded-md p-2 bg-green-400 hover:bg-green-700 transition duration-300 ease-in-out'> Nuevo evento </a>
                            </div>
                            <table className='tablaAdmin rounded-lg'>
                                <thead>
                                    <tr>
                                        <th>ID Evento</th>
                                        <th>Titulo</th>
                                        <th>Contenido</th>
                                        <th>Imagen</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {eventoState.map((evento) => (
                                        <tr key={evento.id}>
                                            <td>{evento.id}</td>
                                            <td>{evento.titulo}</td>
                                            <td className='prueba'><p>{evento.contenido}</p></td>
                                            <td className='p-0'><img src={evento.ruta_imagen} alt={evento.ruta_imagen} className='w-44 h-44'/></td>
                                            <td className='p-0'>
                                                <div className='flex flex-col p-0 h-full'>
                                                    <a href={`/eventos/${evento.id}`} className='w-full h-full inline-flex items-center text-center px-4 py-[1.30rem] bg-blue-600 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 active:bg-blue-700 transition ease-in-out duration-150'>Ver</a>
                                                    <a href={`/eventos/${evento.id}/edit`} className='w-full h-full inline-flex items-center px-4 py-[1.30rem] bg-yellow-600 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-yellow-500 active:bg-yellow-700 transition ease-in-out duration-150'>Editar</a>
                                                    <DangerButton className='w-full h-full rounded-none py-[1.30rem]' onClick={() => confirmarEliminacionEvento(evento.id)}>Eliminar</DangerButton>
                                                    <Modal show={confirmandoEliminacionEvento} onClose={closeModal}>
                                                        <div className='p-6'>
                                                            <h2 className="text-lg font-medium text-gray-900">
                                                                ¿Estás seguro de que quieres borrar el evento?
                                                            </h2>
                                                            <div className="mt-6 flex justify-end">
                                                                <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>
                                                                <DangerButton onClick={handleDelete} className="ms-3">
                                                                    Eliminar
                                                                </DangerButton>
                                                            </div>
                                                        </div>
                                                    </Modal>
                                                    <Modal show={mensajeConfirmacion} onClose={closeMensaje}>
                                                        <div className='p-8 flex flex-col items-center'>
                                                            <div className='w-full flex items-right'>
                                                                <SecondaryButton className='text-black flex justify-center' onClick={closeMensaje}>x</SecondaryButton>
                                                            </div>
                                                            <h2 className="text-3xl font-medium text-gray-900 p-6 w-full text-center">
                                                                Evento eliminado con éxito.
                                                            </h2>
                                                        </div>
                                                    </Modal>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <div className='space-y-2'>
                            <h1 className='text-4xl text-center flex items-center justify-center'>Eventos</h1>
                            <h1 className="text-center">No hay eventos.</h1>
                            <a href={route('eventos.create')} className='flex items-center justify-center text-center p-5 rounded-md bg-green-400 hover:bg-green-700 transition duration-500 ease-in-out'> Añadir evento. </a>
                        </div>
                    )}
                    {eventos.data.length > 0 && (
                        <div className="pagination">
                            {eventos.links.map((link) => (
                                <Link key={link.label} href={link.url} className={link.active ? 'paginationActive' : ''}>
                                    {link.label === '&laquo; Previous' ? 'Anterior' : link.label === 'Next &raquo;' ? 'Siguiente' : link.label}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Index;
