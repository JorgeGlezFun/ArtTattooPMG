import React, { useState } from 'react';
import HeaderAdmin from '@/Components/Componentes-ATP/HeaderAdmin';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import { Head } from '@inertiajs/react';
import axios from 'axios';

const Index = ({ auth, caracteristicas }) => {
    const [confirmandoEliminacionCaracteristica, setConfirmandoEliminacionCaracteristica] = useState(false);
    const [mensajeConfirmacion, setMensajeConfirmacion] = useState(false);
    const [caracteristicaAEliminar, setCaracteristicaAEliminar] = useState(null);
    const [caracteristicaState, setCaracteristicaState] = useState(caracteristicas);

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    console.log(caracteristicas);

    const confirmarEliminacionCaracteristica = (id) => {
        setCaracteristicaAEliminar(id);
        setConfirmandoEliminacionCaracteristica(true);
    };

    const closeModal = () => {
        setConfirmandoEliminacionCaracteristica(false);
        setCaracteristicaAEliminar(null);
    };

    const closeMensaje = () => {
        setMensajeConfirmacion(false);
    };

    const handleDelete = async () => {
        if (!caracteristicaAEliminar) return;

        try {
            const responseCheck = await axios.get(`/caracteristicas/${caracteristicaAEliminar}`);
            if (!responseCheck.data) {
                throw new Error('La característica no existe.');
            }

            console.log('Eliminando característica con ID:', caracteristicaAEliminar);
            const response = await axios.delete(`/caracteristicas/${caracteristicaAEliminar}`, {
                headers: {
                    'X-CSRF-Token': csrfToken,
                },
            });

            // Verifica si la respuesta del servidor indica éxito
            if (response.data.success) {
                setCaracteristicaState(prevCaracteristicas => prevCaracteristicas.filter(caracteristica => caracteristica.id !== caracteristicaAEliminar));
                setMensajeConfirmacion(true);
                console.log('Característica eliminada con éxito.');
            } else {
                throw new Error('Error al eliminar la característica.');
            }
        } catch (error) {
            console.error('Error al eliminar la característica:', error);
            alert('Error al eliminar la característica. Intenta de nuevo más tarde.');
        } finally {
            closeModal();
        }
    };

    console.log(caracteristicaState.caracteristica_tipo);

    return (
        <>
            <Head title="Características" />
            <HeaderAdmin user={auth.user} />
            <div className='mainAdmin'>
                <div>
                    {caracteristicaState.length > 0 ? (
                        <>
                        <div className='w-full flex justify-between mb-2'>
                            <h1 className='text-4xl text-center flex items-center justify-center'>Características</h1>
                            <a href={route('caracteristicas.create')} className='w-fit items-center justify-center flex rounded-md p-2 bg-green-400 hover:bg-green-700 transition duration-300 ease-in-out'> Nueva característica </a>
                        </div>
                        <table className='tablaAdmin'>
                            <thead>
                                <tr>
                                    <th>ID Característica</th>
                                    <th>Tipo</th>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Tiempo</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {caracteristicaState.map((caracteristica) => (
                                    <tr key={caracteristica.id}>
                                        <td>{caracteristica.id}</td>
                                        <td>{caracteristica.caracteristica_tipo.nombre}</td>
                                        <td>{caracteristica.nombre}</td>
                                        <td>{caracteristica.precio}</td>
                                        <td>{caracteristica.tiempo}</td>
                                        <td className='p-0'>
                                            <div className='flex flex-col p-0 h-full'>
                                                <a href={`/caracteristicas/${caracteristica.id}`} className='w-full h-full inline-flex items-center text-center px-4 py-[0.9225rem] bg-blue-600 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 active:bg-blue-700 transition ease-in-out duration-150'>Ver</a>
                                                <a href={`/caracteristicas/${caracteristica.id}/edit`} className='w-full h-full inline-flex items-center px-4 py-[0.9225rem] bg-yellow-600 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-yellow-500 active:bg-yellow-700 transition ease-in-out duration-150'>Editar</a>
                                                <DangerButton className='w-full h-full rounded-none py-[0.9225rem]' onClick={() => confirmarEliminacionCaracteristica(caracteristica.id)}>Eliminar</DangerButton>
                                                <Modal show={confirmandoEliminacionCaracteristica} onClose ={closeModal}>
                                                    <div className='p-6'>
                                                        <h2 className="text-lg font-medium text-gray-900">
                                                            ¿Estás seguro de que quieres borrar la característica?
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
                                                            Característica eliminada con éxito.
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
                            <h1 className='text-4xl text-center flex items-center justify-center'>Características</h1>
                            <h1 className="text-center">No hay caracteristicas.</h1>
                            <a href={route('caracteristicas.create')} className='flex text-center p-5 rounded-md bg-green-400 hover:bg-green-700 transition duration-500 ease-in-out'> Crear una nueva característica </a>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Index
