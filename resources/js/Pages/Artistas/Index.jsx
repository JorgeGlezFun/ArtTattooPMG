import React, { useState } from 'react';
import HeaderAdmin from '@/Components/Componentes-ATP/HeaderAdmin';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import { Head } from '@inertiajs/react';
import axios from 'axios';

const Index = ({ auth, artistas }) => {
    const [corfinmandoEliminacionArtista, setConfirmandoEliminacionArtista] = useState(false);
    const [mensajeConfirmacion, setMensajeConfirmacion] = useState(false);
    const [artistaAEliminar, setArtistaAEliminar] = useState(null);
    const [artistaState, setArtistaState] = useState(artistas);

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const confirmarEliminacionEstacion = (id) => {
        setArtistaAEliminar(id);
        setConfirmandoEliminacionArtista(true);
    };

    const closeModal = () => {
        setConfirmandoEliminacionArtista(false);
        setArtistaAEliminar(null);
    };

    const closeMensaje = () => {
        setMensajeConfirmacion(false);
    };

    const handleDelete = async () => {
        if (!artistaAEliminar) return;

        try {
            const responseCheck = await axios.get(`/artistas/${artistaAEliminar}`);
            if (!responseCheck.data) {
                throw new Error('El artista no existe.');
            }

            console.log('Eliminando estación con ID:', artistaAEliminar);
            const response = await axios.delete(`/artistas/${artistaAEliminar}`, {
                headers: {
                    'X-CSRF-Token': csrfToken,
                },
            });

            // Verifica si la respuesta del servidor indica éxito
            if (response.data.success) {
                setArtistaState(prevArtistas => prevArtistas.filter(artista => artista.id !== artistaAEliminar));
                setMensajeConfirmacion(true);
                console.log('Artista eliminada con éxito.');
            } else {
                throw new Error('Error al eliminar al artista.');
            }
        } catch (error) {
            console.error('Error al eliminar al artista:', error);
            alert('Error al eliminar al artista. Intenta de nuevo más tarde.');
        } finally {
            closeModal();
        }
    };

    return (
        <>
            <Head title="Usuarios" />
            <HeaderAdmin user={auth.user} />
            <div className='mainAdmin'>
                <div>
                    {artistas.data.length > 0 ? (
                        <>
                        <div className='w-full flex justify-between mb-2'>
                            <h1 className='text-4xl text-center flex items-center justify-center'>Usuarios</h1>
                            <a href={route('artistas.create')} className='w-fit items-center justify-center flex rounded-md p-2 bg-green-400 hover:bg-green-700 transition duration-300 ease-in-out'> Nueva estación </a>
                        </div>
                        <table className='tablaAdmin'>
                            <thead>
                                <tr>
                                    <th>ID Artista</th>
                                    <th>Nombre</th>
                                    <th>Apellidos</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {artistas.data.map((artista) => (
                                    <tr key={artista.id}>
                                        <td>{artista.id}</td>
                                        <td>{artista.nombre}</td>
                                        <td>{artista.apellidos}</td>
                                        <td className='p-0'>
                                            <div className='flex flex-col p-0 h-full'>
                                                <a href={`/artistas/${artista.id}`} className='w-full h-full inline-flex items-center text-center px-4 py-[0.9225rem] bg-blue-600 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 active:bg-blue-700 transition ease-in-out duration-150'>Ver</a>
                                                <a href={`/artistas/${artista.id}/edit`} className='w-full h-full inline-flex items-center px-4 py-[0.9225rem] bg-yellow-600 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-yellow-500 active:bg-yellow-700 transition ease-in-out duration-150'>Editar</a>
                                                <DangerButton className='w-full h-full rounded-none py-[0.9225rem]' onClick={() => confirmarEliminacionEstacion(artista.id)}>Eliminar</DangerButton>
                                                <Modal show={corfinmandoEliminacionArtista} onClose ={closeModal}>
                                                    <div className='p-6'>
                                                        <h2 className="text-lg font-medium text-gray-900">
                                                            ¿Estás seguro de que quieres borrar al artista?
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
                                                            Artista eliminado con éxito.
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
                            <h1 className='text-4xl text-center flex items-center justify-center'>Usuarios</h1>
                            <h1 className="text-center">No hay artistas.</h1>
                            <a href={route('artistas.create')} className='flex text-center p-5 rounded-md bg-green-400 hover:bg-green-700 transition duration-500 ease-in-out'> Crear un nuevo artista </a>
                        </div>
                    )}
                    {artistas.data.length > 0 && (
                        <div className="pagination">
                            {artistas.links.map((link) => (
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
