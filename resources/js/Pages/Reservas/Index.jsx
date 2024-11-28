import React, { useState } from 'react';
import HeaderAdmin from '@/Components/Componentes-ATP/HeaderAdmin';
import { Head } from '@inertiajs/react';
import axios from 'axios';

const Index = ({ auth, reservas }) => {
    const [reservasState, setReservasState] = useState(reservas);

    // Obtener el token CSRF
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    console.log('Token CSRF:', csrfToken);
    const handleDelete = async (id) => {
        if (confirm('¿Estás seguro de eliminar esta reserva?')) {
            try {
                alert('Eliminando reserva...');

                // Realizar la solicitud de eliminación
                await axios.post(`/reservas/${id}`, {}, {
                    headers: {
                        'X-CSRF-Token': csrfToken, // Usar el token CSRF aquí
                    },
                    method: 'DELETE',
                });

                // Filtra la reserva eliminada del estado
                setReservasState(reservasState.filter(reserva => reserva.id !== id));

                alert('Reserva eliminada con éxito.');
            } catch (error) {
                console.error('Error al eliminar la reserva:', error);
                alert('Error al eliminar la reserva. Intenta de nuevo más tarde.');
            }
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
                                        <td><img src={reserva.tatuaje.ruta_imagen} alt="Imagen del tatuaje" className='w-10 h-10'/></td>
                                        <td>{reserva.cliente.nombre}</td>
                                        <td>{reserva.artista.nombre}</td>
                                        <td>{reserva.fecha}</td>
                                        <td>{reserva.hora_inicio}</td>
                                        <td>{reserva.hora_fin}</td>
                                        <td>{reserva .duracion} hora/s</td>
                                        <td>{reserva.tatuaje.precio}€</td>
                                        <td>
                                            <a href={`/reservas/${reserva.id}`} className='text-blue-600 hover:text-blue-800'>Ver</a>
                                            <a href={`/reservas/${reserva.id}/edit`} className='text-yellow-600 hover:text-yellow-800'>Editar</a>
                                            <form onSubmit={(e) => { e.preventDefault(); handleDelete(reserva.id); method='delete'}}>
                                                <button type="submit" className='text-red-600 hover:text-red-800'>Eliminar</button>
                                            </form>
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
