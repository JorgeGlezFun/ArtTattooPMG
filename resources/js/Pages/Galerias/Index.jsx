import React, { useState } from 'react';
import HeaderAdmin from '@/Components/Componentes-ATP/HeaderAdmin';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import { Head } from '@inertiajs/react';
import axios from 'axios';

const Index = ({ auth, galerias }) => {
    const [confirmandoEliminacionGaleria, setConfirmandoEliminacionGaleria] = useState(false);
    const [mensajeConfirmacion, setMensajeConfirmacion] = useState(false);
    const [galeriaAEliminar, setGaleriaAEliminar] = useState(null);
    const [galeriaState, setGaleriaState] = useState(galerias);

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const confirmarEliminacionGaleria = (id) => {
        setGaleriaAEliminar(id);
        setConfirmandoEliminacionGaleria(true);
    };

    const closeModal = () => {
        setConfirmandoEliminacionGaleria(false);
        setGaleriaAEliminar(null);
    };

    const closeMensaje = () => {
        setMensajeConfirmacion(false);
    };

    const handleDelete = async () => {
        if (!galeriaAEliminar) return;

        try {
            console.log('Eliminando galeria con ID:', galeriaAEliminar);
            const response = await axios.delete(`/galerias/${galeriaAEliminar}`, {
                headers: {
                    'X-CSRF-Token': csrfToken,
                },
            });

            if (response.data.success) {
                setGaleriaState(prevGalerias => prevGalerias.filter(galeria => galeria.id !== galeriaAEliminar));
                setMensajeConfirmacion(true);
                console.log('Galeria eliminada con éxito.');
            } else {
                throw new Error('Error al eliminar la galeria.');
            }
        } catch (error) {
            console.error('Error al eliminar la galeria:', error);
            alert('Error al eliminar el galeria. Intenta de nuevo más tarde.');
        } finally {
            closeModal();
        }
    };

    return (
        <>
            <Head title="Galeria" />
            <HeaderAdmin user={auth.user} />
            <div className='mainAdmin'>
                <div>
                    {galeriaState.length > 0 ? (
                        <>
                            <div className='w-full flex justify-between mb-2'>
                                <h1 className='text-4xl text-center flex items-center justify-center'>Galerias</h1>
                                <a href={route('galerias.create')} className='w-fit items-center justify-center flex rounded-md p-2 bg-green-400 hover:bg-green-700 transition duration-300 ease-in-out'> Nueva imagen </a>
                            </div>
                            <table className='tablaAdmin rounded-lg'>
                                <thead>
                                    <tr>
                                        <th>ID Galeria</th>
                                        <th>Galeria</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {galeriaState.map((galeria) => (
                                        <tr key={galeria.id}>
                                            <td>{galeria.id}</td>
                                            <td className='p-0'><img src={galeria.ruta_imagen} alt={galeria.ruta_imagen} className='w-44 h-44'/></td>
                                            <td className='p-0'>
                                                <div className='flex flex-col p-0 h-full'>
                                                    <a href={`/galerias/${galeria.id}`} className='w-full h-full inline-flex items-center text-center px-4 py-[1.30rem] bg-blue-600 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 active:bg-blue-700 transition ease-in-out duration-150'>Ver</a>
                                                    <a href={`/galerias/${galeria.id}/edit`} className='w-full h-full inline-flex items-center px-4 py-[1.30rem] bg-yellow-600 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-yellow-500 active:bg-yellow-700 transition ease-in-out duration-150'>Editar</a>
                                                    <DangerButton className='w-full h-full rounded-none py-[1.30rem]' onClick={() => confirmarEliminacionGaleria(galeria.id)}>Eliminar</DangerButton>
                                                    <Modal show={confirmandoEliminacionGaleria} onClose={closeModal}>
                                                        <div className='p-6'>
                                                            <h2 className="text-lg font-medium text-gray-900">
                                                                ¿Estás seguro de que quieres borrar la galeria?
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
                                                                Galeria eliminada con éxito.
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
                            <h1 className='text-4xl text-center flex items-center justify-center'>Galerias</h1>
                            <h1 className="text-center">No hay fotos para la galeria.</h1>
                            <a href={route('galerias.create')} className='flex items-center justify-center text-center p-5 rounded-md bg-green-400 hover:bg-green-700 transition duration-500 ease-in-out'> Añadir imagen. </a>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Index;
