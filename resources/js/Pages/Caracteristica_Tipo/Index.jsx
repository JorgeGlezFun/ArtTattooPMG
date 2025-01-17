import React, { useState } from 'react';
import HeaderAdmin from '@/Components/Componentes-ATP/HeaderAdmin';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import { Head } from '@inertiajs/react';
import axios from 'axios';

const Index = ({ auth, caracteristica_tipos }) => {
    const [confirmandoEliminacionTipoCaracteristica, setConfirmandoEliminacionCaracteristica] = useState(false);
    const [mensajeConfirmacion, setMensajeConfirmacion] = useState(false);
    const [tipoCaracteristicaAEliminar, setCaracteristicaAEliminar] = useState(null);
    const [tiposCaracteristicas, setTiposCaracteristicas] = useState(caracteristica_tipos.data);

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

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

    const handleDelete = async (id) => {
        if (!tipoCaracteristicaAEliminar) return;

        try {
            console.log('Eliminando característica con ID:', tipoCaracteristicaAEliminar);
            const response = await axios.delete(`/caracteristica_tipo/${tipoCaracteristicaAEliminar}`, {
                headers: {
                    'X-CSRF-Token': csrfToken,
                },
            });

            if ( response.data.success) {
                setTiposCaracteristicas(prev => prev.filter(tipo => tipo.id !== tipoCaracteristicaAEliminar));
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

    return (
        <>
            <Head title="Tipos de característica" />
            <HeaderAdmin user={auth.user} />
            <div className='mainAdmin'>
                <div>
                    {tiposCaracteristicas.length > 0 ? (
                        <>
                        <div className='w-full flex justify-between mb-2'>
                            <h1 className='text-4xl text-center flex items-center justify-center'>Tipos de características</h1>
                            <a href={route('caracteristica_tipo.create')} className='w-fit items-center justify-center flex rounded-md p-2 bg-green-400 hover:bg-green-700 transition duration-300 ease-in-out'> Nuevo tipo </a>
                        </div>
                        <table className='tablaAdmin'>
                            <thead>
                                <tr>
                                    <th>ID Tipo</th>
                                    <th>Nombre</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tiposCaracteristicas.map((tipo) => (
                                    <tr key={tipo.id}>
                                        <td>{tipo.id}</td>
                                        <td>{tipo.nombre}</td>
                                        <td className='p-0'>
                                            <div className='flex flex-row p-0 h-full'>
                                                <a href={`/caracteristica_tipo/${tipo.id}`} className='w-full h-full inline-flex items-center text-center px-8 py-6 bg-blue-600 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 active:bg-blue-700 transition ease-in-out duration-150'>Ver</a>
                                                <a href={`/caracteristica_tipo/${tipo.id}/edit`} className='w-full h-full inline-flex items-center px-4 py-6 bg-yellow-600 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-yellow-500 active:bg-yellow-700 transition ease-in-out duration-150'>Editar</a>
                                                <DangerButton className='w-full h-full rounded-none py-6' onClick={() => confirmarEliminacionCaracteristica(tipo.id)}>Eliminar</DangerButton>
                                                <Modal show={confirmandoEliminacionTipoCaracteristica} onClose={closeModal}>
                                                    <div className='p-6'>
                                                        <h2 className="text-lg font-medium text-gray-900">
                                                            ¿Estás seguro de que quieres borrar el tipo?
                                                        </h2>
                                                        <div className="mt-6 flex justify-end">
                                                            <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>
                                                            <DangerButton onClick={() => handleDelete(tipoCaracteristicaAEliminar)} className="ms-3">
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
                                                            Tipo eliminado con éxito.
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
                            <h1 className='text-4xl text-center flex items-center justify-center'>Tipos de características</h1>
                            <h1 className="text-center">No hay tipos.</h1>
                            <a href={route('caracteristica_tipo.create')} className='flex justify-center text-center p-5 rounded-md bg-green-400 hover:bg-green-700 transition duration-500 ease-in-out'> Crear un nuevo tipo de característica. </a>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Index;
