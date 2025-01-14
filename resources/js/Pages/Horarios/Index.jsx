import React, { useState } from 'react';
import HeaderAdmin from '@/Components/Componentes-ATP/HeaderAdmin';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import { Head } from '@inertiajs/react';
import axios from 'axios';

const Index = ({ auth, horarios }) => {
    const [confirmandoEliminacionHorario, setConfirmandoEliminacionHorario] = useState(false);
    const [mensajeConfirmacion, setMensajeConfirmacion] = useState(false);
    const [horarioAEliminar, setHorarioAEliminar] = useState(null);
    const [horariosState, setHorarioState] = useState(horarios);

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const confirmarEliminacionHorario = (id) => {
        setHorarioAEliminar(id);
        setConfirmandoEliminacionHorario(true);
    };

    const closeModal = () => {
        setConfirmandoEliminacionHorario(false);
        setHorarioAEliminar(null);
    };

    const closeMensaje = () => {
        setMensajeConfirmacion(false);
    };

    const handleDelete = async () => {
        if (!horarioAEliminar) return;

        try {
            console.log('Eliminando horario con ID:', horarioAEliminar);
            const response = await axios.delete(`/horarios/${horarioAEliminar}`, {
                headers: {
                    'X-CSRF-Token': csrfToken,
                },
            });

            if (response.data.success) {
                setHorarioState(prevHorarios => prevHorarios.filter(horario => horario.id !== horarioAEliminar));
                setMensajeConfirmacion(true);
                console.log('Horario eliminado con éxito.');
            } else {
                throw new Error('Error al eliminar el horario.');
            }
        } catch (error) {
            console.error('Error al eliminar el horario:', error);
            alert('Error al eliminar el horario. Intenta de nuevo más tarde.');
        } finally {
            closeModal();
        }
    };

    return (
        <>
            <Head title="Horarios" />
            <HeaderAdmin user={auth.user} />
            <div className='mainAdmin'>
                <div>
                    {horariosState.length > 0 ? (
                        <>
                            <div className='w-full flex justify-between mb-2'>
                                <h1 className='text-4xl text-center flex items-center justify-center'>Horas</h1>
                                <a href={route('horarios.create')} className='w-fit items-center justify-center flex rounded-md p-2 bg-green-400 hover:bg-green-700 transition duration-300 ease-in-out'> Nueva hora </a>
                            </div>
                            <table className='tablaAdmin rounded-lg'>
                                <thead>
                                    <tr>
                                        <th>ID Hora</th>
                                        <th>Hora</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {horariosState.map((horario) => (
                                        <tr key={horario.id}>
                                            <td>{horario.id}</td>
                                            <td>{horario.hora}</td>
                                            <td className='p-0'>
                                                <div className='flex flex-row p-0 h-full'>
                                                    <a href={`/horarios/${horario.id}`} className='w-full h-full inline-flex items-center text-center px-4 py-5 bg-blue-600 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 active:bg-blue-700 transition ease-in-out duration-150'>Ver</a>
                                                    <a href={`/horarios/${horario.id}/edit`} className='w-full h-full inline-flex items-center px-4 py-5 bg-yellow-600 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-yellow-500 active:bg-yellow-700 transition ease-in-out duration-150'>Editar</a>
                                                    <DangerButton className='w-full h-full rounded-none py-5' onClick={() => confirmarEliminacionHorario(horario.id)}>Eliminar</DangerButton>
                                                    <Modal show={confirmandoEliminacionHorario} onClose={closeModal}>
                                                        <div className='p-6'>
                                                            <h2 className="text-lg font-medium text-gray-900">
                                                                ¿Estás seguro de que quieres borrar el horario?
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
                                                                Horario eliminado con éxito.
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
                            <h1 className='text-4xl text-center flex items-center justify-center'>Horas</h1>
                            <h1 className="text-center">No hay horas.</h1>
                            <a href={route('horarios.create')} className='flex text-center p-5 rounded-md bg-green-400 hover:bg-green-700 transition duration-500 ease-in-out'> Crear un nuevo horario </a>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Index;
