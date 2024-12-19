import React, { useState } from 'react';
import HeaderAdmin from '@/Components/Componentes-ATP/HeaderAdmin';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import { Head } from '@inertiajs/react';
import axios from 'axios';

const Index = ({ auth, estaciones }) => {
    const [confirmandoEliminacionEstacion, setConfirmandoEliminacionEstacion] = useState(false);
    const [mensajeConfirmacion, setMensajeConfirmacion] = useState(false);
    const [estacionAEliminar, setEstacionAEliminar] = useState(null);
    const [estacionesState, setEstacionesState] = useState(estaciones);

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const confirmarEliminacionEstacion = (id) => {
        setEstacionAEliminar(id);
        setConfirmandoEliminacionEstacion(true);
    };

    const closeModal = () => {
        setConfirmandoEliminacionEstacion(false);
        setEstacionAEliminar(null);
    };

    const closeMensaje = () => {
        setMensajeConfirmacion(false);
    };

    const handleDelete = async () => {
        if (!estacionAEliminar) return;

        try {
            const responseCheck = await axios.get(`/estaciones/${estacionAEliminar}`);
            if (!responseCheck.data) {
                throw new Error('La estación no existe.');
            }

            console.log('Eliminando estación con ID:', estacionAEliminar);
            const response = await axios.delete(`/estaciones/${estacionAEliminar}`, {
                headers: {
                    'X-CSRF-Token': csrfToken,
                },
            });

            // Verifica si la respuesta del servidor indica éxito
            if (response.data.success) {
                setEstacionesState(prevEstaciones => prevEstaciones.filter(estacion => estacion.id !== estacionAEliminar));
                setMensajeConfirmacion(true);
                console.log('Estación eliminada con éxito.');
            } else {
                throw new Error('Error al eliminar la estación.');
            }
        } catch (error) {
            console.error('Error al eliminar la estación:', error);
            alert('Error al eliminar la estación. Intenta de nuevo más tarde.');
        } finally {
            closeModal();
        }
    };

    return (
        <>
            <Head title="Estaciones" />
            <HeaderAdmin user={auth.user} />
            <div className='mainAdmin'>
                <div>
                    {estacionesState.length > 0 ? (
                        <>
                        <div className='w-full flex justify-between mb-2'>
                            <h1 className='text-4xl text-center flex items-center justify-center'>Estaciones</h1>
                            <a href={route('estaciones.create')} className='w-fit items-center justify-center flex rounded-md p-2 bg-green-400 hover:bg-green-700 transition duration-300 ease-in-out'> Nueva estación </a>
                        </div>
                        <table className='tablaAdmin'>
                            <thead>
                                <tr>
                                    <th>ID Estación</th>
                                    <th>Nombre</th>
                                    <th>Horas Asociadas</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {estacionesState.map((estacion) => (
                                    <tr key={estacion.id}>
                                        <td>{estacion.id}</td>
                                        <td>{estacion.nombre}</td>
                                        <td>
                                            {estacion.horas && estacion.horas.length > 0 ? (
                                                estacion.horas.map(hora => (
                                                    <div key={hora.id}>{hora.hora}</div> // Muestra cada hora asociada
                                                ))
                                            ) : (
                                                <span>No hay horas asociadas</span>
                                            )}
                                        </td>
                                        <td className='p-0'>
                                            <div className='flex flex-col p-0 h-full'>
                                                <a href={`/estaciones/${estacion.id}`} className='w-full h-full inline-flex items-center text-center px-4 py-[0.9225rem] bg-blue-600 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 active:bg-blue-700 transition ease-in-out duration-150'>Ver</a>
                                                <a href={`/estaciones/${estacion.id}/edit`} className='w-full h-full inline-flex items-center px-4 py-[0.9225rem] bg-yellow-600 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-yellow-500 active:bg-yellow-700 transition ease-in-out duration-150'>Editar</a>
                                                <DangerButton className='w-full h-full rounded-none py-[0.9225rem]' onClick={() => confirmarEliminacionEstacion(estacion.id)}>Eliminar</DangerButton>
                                                <Modal show={confirmandoEliminacionEstacion} onClose ={closeModal}>
                                                    <div className='p-6'>
                                                        <h2 className="text-lg font-medium text-gray-900">
                                                            ¿Estás seguro de que quieres borrar la estación?
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
                                                            Estación eliminada con éxito.
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
                            <h1 className='text-4xl text-center flex items-center justify-center'>Estaciones</h1>
                            <h1 className="text-center">No hay estaciones.</h1>
                            <a href={route('estaciones.create')} className='flex text-center p-5 rounded-md bg-green-400 hover:bg-green-700 transition duration-500 ease-in-out'> Crear una nueva estación </a>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Index
