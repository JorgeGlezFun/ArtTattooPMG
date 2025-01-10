import React from 'react';
import Header from '@/Components/Componentes-ATP/HeaderAdmin';
import { Head } from '@inertiajs/react';

const Show = ({ auth, usuario, cliente }) => {
    return (
        <>
            <Head title="Detalles de la Estación" />
            <Header user={auth.user} />
            <div className='mainAdmin'>
                <div className="contenedorReserva">
                    <h1 className="titulo">Detalles del usuario</h1>
                    <hr className="separadorFormulario"/>
                    <div className='flex flex-col w-full'>
                        <div className='flex flex-col space-y-16'>
                            <div className='detallesUsuario'>
                                <div>
                                    <p><strong>Id de Usuario:</strong> {usuario.id}</p>
                                    <p><strong>Id de Cliente:</strong> {cliente.id}</p>
                                    <p><strong>Nombre:</strong> {usuario.nombre}</p>
                                    <p><strong>Apellidos:</strong> {usuario.apellidos}</p>
                                    <p><strong>Teléfono:</strong> {usuario.telefono}</p>
                                    <p><strong>Correo eléctronico:</strong> {usuario.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className='w-full h-full flex justify-end items-end'>
                            <a href={route('usuarios.index')} className='botonShow'>Volver</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Show;
