import { useState } from 'react'; // Importar useState
import Header from '@/Components/Componentes-ATP/Header';
import Footer from '@/Components/Componentes-ATP/Footer';
import DeleteUser from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status, reservas }) {
    const [activeSection, setActiveSection] = useState('perfil');
    const [currentReservas, setCurrentReservas] = useState(reservas);
    const totalReservas = reservas.length;

    const formatearFecha = (fecha) => {
        const fechaFormateada = new Date(fecha);
        return fechaFormateada.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const cancelarReserva = async (reservaId) => {
        try {
            const response = await fetch(`/reservas/${reservaId}/cancelar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
            });

            if (!response.ok) {
                throw new Error('Error al cancelar la reserva');
            }

            alert('Reserva cancelada con éxito');
        } catch (error) {
            console.error('Error al cancelar la reserva:', error);
            alert('Hubo un problema al cancelar la reserva.');
        }
    };


    return (
        <>
            <Head title="Perfil" />
            <Header user={auth.user} />
            <div className="main">
                <div className="contenedorPerfil">
                    <div className="contenedorOpcionesPerfil">
                        <div className="w-60">
                            <label className="opcionPerfil">
                                <input
                                    type="radio"
                                    name="section"
                                    value="perfil"
                                    checked={activeSection === 'perfil'}
                                    onChange={() => setActiveSection('perfil')}
                                />
                                <span>Perfil</span>
                            </label>
                        </div>
                        <div className="w-60">
                            <label className="opcionPerfil">
                                <input
                                    type="radio"
                                    name="section"
                                    value="reservas"
                                    checked={activeSection === 'reservas'}
                                    onChange={() => setActiveSection('reservas')}
                                />
                                <span>Reservas</span>
                            </label>
                        </div>
                        <div className="w-60">
                            <label className="opcionPerfil">
                                <input
                                    type="radio"
                                    name="section"
                                    value="sellos"
                                    checked={activeSection === 'sellos'}
                                    onChange={() => setActiveSection('sellos')}
                                />
                                <span>Tarjeta de sellos</span>
                            </label>
                        </div>
                    </div>
                    <div className="max-w-7xl sm:px-6 lg:px-8 space-y-6 w-full">
                        {activeSection === 'perfil' && (
                            <>
                                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                    <UpdateProfileInformationForm
                                        mustVerifyEmail={mustVerifyEmail}
                                        status={status}
                                        className="max-w-xl"
                                    />
                                </div>

                                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                    <UpdatePasswordForm className="max-w-xl" />
                                </div>

                                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                    <DeleteUser className="max-w-xl" />
                                </div>
                            </>
                        )}

                        {activeSection === 'reservas' && (
                            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                {currentReservas.length === 0 ? (
                                    <>
                                        <h1 className="titulo">No tienes reservas</h1>
                                        <h2>
                                            <strong>Saldo:</strong> {auth.user.saldo}€
                                        </h2>
                                    </>
                                ) : (
                                    <>
                                        <h1 className="titulo">Detalles de la Reserva</h1>
                                        <hr className="separadorFormulario" />
                                        <h2>
                                            <strong>Saldo:</strong> {auth.user.saldo}€
                                        </h2>
                                        {currentReservas.map((reserva) => (
                                            <div key={reserva.id} className="my-10">
                                                <div className="flex space-x-4 w-full">
                                                    {reserva.tatuaje.ruta_imagen && (
                                                        <div className="border-8 border-solid border-black rounded-md">
                                                            <img
                                                                src={'storage/' + reserva.tatuaje.ruta_imagen}
                                                                alt={reserva.tatuaje.ruta_imagen}
                                                                className="previewImagenProfile"
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="flex flex-col space-y-16 w-full">
                                                        <div className="detallesReservaProfile">
                                                            <div className="w-full">
                                                                <h2>Detalles de la Reserva</h2>
                                                                <p>
                                                                    <strong>Artista:</strong> {reserva.artista.nombre}
                                                                </p>
                                                                <p>
                                                                    <strong>Fecha:</strong> {formatearFecha(reserva.fecha)}
                                                                </p>
                                                                <p>
                                                                    <strong>Hora de Inicio:</strong>{' '}
                                                                    {reserva.hora_inicio.substring(0, 5)}
                                                                </p>
                                                                <p>
                                                                    <strong>Hora de Fin:</strong>{' '}
                                                                    {reserva.hora_fin.substring(0, 5)}
                                                                </p>
                                                                {reserva.duracion > 1 ? (
                                                                    <p>
                                                                        <strong>Duración Estimada:</strong>{' '}
                                                                        {reserva.duracion} horas
                                                                    </p>
                                                                ) : (
                                                                    <p>
                                                                        <strong>Duración Estimada:</strong>{' '}
                                                                        {reserva.duracion} hora
                                                                    </p>
                                                                )}
                                                                <p>
                                                                    <strong>Precio de la Señal:</strong>{' '}
                                                                    {reserva.tatuaje.precio}€
                                                                </p>
                                                                <p>
                                                                    <strong>Estado de la reserva:</strong>{' '}
                                                                    {reserva.estado}
                                                                </p>
                                                            </div>
                                                            <div className="w-full">
                                                                <h2>Detalles del Tatuaje</h2>
                                                                <p>
                                                                    <strong>Características:</strong>
                                                                </p>
                                                                {reserva.tatuaje.caracteristicas.length > 0 ? (
                                                                    reserva.tatuaje.caracteristicas.map(
                                                                        (caracteristica) => (
                                                                            <p key={caracteristica.id}>
                                                                                {caracteristica.nombre}
                                                                            </p>
                                                                        )
                                                                    )
                                                                ) : (
                                                                    <p>No hay características asociadas a este tatuaje.</p>
                                                                )}
                                                                {reserva.estado.toLowerCase() != 'cancelada' && (
                                                                    <button
                                                                        onClick={()=>cancelarReserva(reserva.id,)}
                                                                        className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-500 ease-in-out"
                                                                    >
                                                                        Cancelar Reserva
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        )}
                        {activeSection === 'sellos' && (
                            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                <h1 className="titulo">Tarjeta de Sellos</h1>
                                <table className="table-auto w-full">
                                    <tbody>
                                        {[...Array(2)].map((_, index) => (
                                            <tr key={index}>
                                                {[...Array(4)].map((_, columnIndex) => (
                                                    <td
                                                        key={columnIndex}
                                                        className="border p-4 text-center"
                                                    >
                                                        {totalReservas === 0 ? (
                                                            <span role="img" aria-label="vacío">
                                                                ❌
                                                            </span>
                                                        ) : (index * 4 + columnIndex < totalReservas % 8 ||
                                                              (totalReservas % 8 === 0 &&
                                                                  index * 4 + columnIndex < 8)) ? (
                                                            <span role="img" aria-label="sello">
                                                                ✅
                                                            </span>
                                                        ) : (
                                                            <span role="img" aria-label="vacío">
                                                                ❌
                                                            </span>
                                                        )}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {totalReservas % 8 === 0 && reservas.length !== 0 ? (
                                    <div>
                                        <p className="text-green-600 font-bold">
                                            ¡Felicidades! Has completado 8 reservas y obtienes un descuento.
                                        </p>
                                        <a
                                            href={route('reservas.create')}
                                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                                        >
                                            Usar Descuento
                                        </a>
                                    </div>
                                ) : (
                                    <p>
                                        Completa {8 - (totalReservas % 8)} reservas más para obtener un descuento.
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
