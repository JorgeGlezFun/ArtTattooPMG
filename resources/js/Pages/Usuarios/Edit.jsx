import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Header from '@/Components/Componentes-ATP/HeaderAdmin';
import Footer from '@/Components/Componentes-ATP/Footer';
import { Head } from '@inertiajs/react';
import MensajeFlash from '@/Components/Componentes-ATP/MensajeFlash';

const Edit = ({ auth, usuario }) => {
    const { data, setData, put, processing, errors } = useForm({
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        telefono: usuario.telefono,
        email: '',
    });

    const message = window.sessionStorage.getItem('flashMessage');

    // Limpiar el mensaje de la sesión después de mostrarlo
    if (message) {
        window.sessionStorage.removeItem('flashMessage');
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [parent, key] = name.split('.');
        console.log('Parent:', parent, 'Key:', key, 'Value:', value);
        if (key) {
            setData(parent, { ...data[parent], [key]: value });
        } else {
            setData(name, value);
        }
    };

    console.log(data);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await put(route('usuarios.update', usuario.id), data);
            console.log('Usuario actualizado con éxito');
        } catch (error) {
            console.error('Error al actualizar el usuario:', error.response ? error.response.data : error.message);
        }
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.append('_method', 'PUT');
    //     formData.append('nombre', data.nombre);
    //     formData.append('apellidos', data.apellidos);
    //     formData.append('telefono', data.telefono);
    //     formData.append('email', data.email);

    //     try {
    //         await put(route('usuarios.update', usuario.id), formData, {
    //             forcedFormData: true,
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             }
    //         });
    //         console.log('Usuario actualizado con éxito');
    //     } catch (error) {
    //         console.error('Error al actualizar el usuario:', error.response ? error.response.data : error.message);
    //     }
    // };

    return (
        <>
            <Head title="Editar Usuario" />
            <Header user={auth.user} />
            <div className='main'>
                <MensajeFlash message={message} />
                <div className="contenedorReserva">
                    <div className='contenedorFormulario'>
                        <form onSubmit={handleSubmit} className='formulario' encType="multipart/form-data">
                            <h1 className="titulo">Edita el usuario</h1>
                            <hr className="separadorFormulario"/>
                            <div className='filaUno'>
                                <div className='columnaNombre'>
                                    <label>Nombre:</label>
                                    <input className='inputs' type="text" name="nombre" value={data.nombre} onChange={handleChange} />
                                    {errors['nombre'] && <div>{errors['nombre']}</div>}
                                </div>
                                <div className='columnaApellido'>
                                    <label>Apellidos:</label>
                                    <input className='inputs' type="text" name="apellidos" value={data.apellidos} onChange={handleChange} />
                                    {errors['apellidos'] && <div>{errors['apellidos']}</div>}
                                </div>
                            </div>
                            <div className='columnas'>
                                <label>Teléfono:</label>
                                <input className='inputs' type="text" name="telefono" value={data.telefono} onChange={handleChange} />
                                {errors['telefono'] && <div>{errors['telefono']}</div>}
                            </div>
                            <div className='columnas'>
                                <label>Email:</label>
                                <input className='inputs' type="email" name="email" value={data.email} onChange={handleChange} />
                                {errors['email'] && <div>{errors['email']}</div>}
                            </div>
                            {/* <div className='columnas'>
                                <label>Contraseña:</label>
                                <input className='inputs' type="password" name="password" value={data.password} onChange={handleChange} />
                                {errors['password'] && <div>{errors['password']}</div>}
                            </div>
                            <div className='columnas'>
                                <label>Confirma la contraseña:</label>
                                <input className='inputs' type="password" name="password_confirmation" value={data.password_confirmation} onChange={handleChange} />
                                {errors['password_confirmation'] && <div>{errors['password_confirmation']}</div>}
                            </div> */}
                            <button type="submit" disabled={processing} className='botonFormulario'>Actualizar usuario</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Edit;
