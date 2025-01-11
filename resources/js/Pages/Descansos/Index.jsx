import React, { useState } from 'react';
import HeaderAdmin from '@/Components/Componentes-ATP/HeaderAdmin';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';

const Index = ({ auth, descansos }) => {
    const [confirmandoEliminacionDescanso, setConfirmandoEliminacionDescanso] = useState(false);
    const [mensajeConfirmacion, setMensajeConfirmacion] = useState(false);
    const [descansoAEliminar, setDescansoAEliminar] = useState(null);
    const [descansosState, setDescansosState] = useState(descansos);

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const confirmarEliminacionEstacion = (id) => {
        setDescansoAEliminar(id);
        setConfirmandoEliminacionDescanso(true);
    };

    const closeModal = () => {
        setConfirmandoEliminacionDescanso(false);
        setDescansoAEliminar(null);
    };

    const closeMensaje = () => {
        setMensajeConfirmacion(false);
    };

    const handleDelete = async () => {
        if (!descansoAEliminar) return;

        try {
            const responseCheck = await axios.get(`/descansos/${descansoAEliminar}`);
            if (!responseCheck.data) {
                throw new Error('El descanso no existe.');
            }

            console.log('Eliminando descanso con ID:', descansoAEliminar);
            const response = await axios.delete(`/descansos/${descansoAEliminar}`, {
                headers: {
                    'X-CSRF-Token': csrfToken,
                },
            });

            // Verifica si la respuesta del servidor indica éxito
            if (response.data.success) {
                setDescansosState(prevDescansos => prevDescansos.filter(descanso => descanso.id !== descansoAEliminar));
                setMensajeConfirmacion(true);
                console.log('Descanso eliminado con éxito.');
            } else {
                throw new Error('Error al eliminar el descanso.');
            }
        } catch (error) {
            console.error('Error al eliminar el descanso:', error);
            alert('Error al eliminar el descanso. Intenta de nuevo más tarde.');
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
            <Head title="Descansos" />
            <HeaderAdmin user={auth.user} />
            <div className='mainAdmin'>
                <div>
                    {descansos.data.length > 0 ? (
                        <>
                        <div className='w-full flex justify-between mb-2'>
                            <h1 className='text-4xl text-center flex items-center justify-center'>Descansos</h1>
                            <a href={route('descansos.create')} className='w-fit items-center justify-center flex rounded-md p-2 bg-green-400 hover:bg-green-700 transition duration-300 ease-in-out'> Nuevo descanso </a>
                        </div>
                        <table className='tablaAdmin'>
                            <thead>
                                <tr>
                                    <th>ID Descanso</th>
                                    <th>Fecha</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {descansos.data.map((descanso) => (
                                    <tr key={descanso.id}>
                                        <td>{descanso.id}</td>
                                        <td>{formatearFecha(descanso.fecha)}</td>
                                        <td className='p-0'>
                                            <div className='flex flex-col p-0 h-full'>
                                                <a href={`/descansos/${descanso.id}`} className='w-full h-full inline-flex items-center text-center px-4 py-[0.9225rem] bg-blue-600 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 active:bg-blue-700 transition ease-in-out duration-150'>Ver</a>
                                                <a href={`/descansos/${descanso.id}/edit`} className='w-full h-full inline-flex items-center px-4 py-[0.9225rem] bg-yellow-600 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-yellow-500 active:bg-yellow-700 transition ease-in-out duration-150'>Editar</a>
                                                <DangerButton className='w-full h-full rounded-none py-[0.9225rem]' onClick={() => confirmarEliminacionEstacion(descanso.id)}>Eliminar</DangerButton>
                                                <Modal show={confirmandoEliminacionDescanso} onClose ={closeModal}>
                                                    <div className='p-6'>
                                                        <h2 className="text-lg font-medium text-gray-900">
                                                            ¿Estás seguro de que quieres borrar el descanso?
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
                                                            Descanso eliminado con éxito.
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
                            <h1 className='text-4xl text-center flex items-center justify-center'>Descansos</h1>
                            <h1 className="text-center">No hay descansos.</h1>
                            <a href={route('descansos.create')} className='flex text-center p-5 rounded-md bg-green-400 hover:bg-green-700 transition duration-500 ease-in-out'> Crear nuevo descanso. </a>
                        </div>
                    )}
                    {descansos.data.length > 0 && (
                        <div className="pagination">
                            {descansos.links.map((link) => (
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

export default Index
