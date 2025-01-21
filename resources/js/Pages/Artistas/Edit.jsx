import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Header from '@/Components/Componentes-ATP/HeaderAdmin';
import Footer from '@/Components/Componentes-ATP/Footer';
import { Head } from '@inertiajs/react';
import MensajeFlash from '@/Components/Componentes-ATP/MensajeFlash';

const Edit = ({ auth, artista }) => {
    const { data, setData, put, processing, errors } = useForm({
        nombre: artista.nombre,
        apellidos: artista.apellidos,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [parent, key] = name.split('.');
        if (key) {
            setData(parent, { ...data[parent], [key]: value });
        } else {
            setData(name, value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('nombre', data.nombre);
        formData.append('apellidos', data.apellidos);

        try {
            await put(route('artistas.update', artista.id), formData, {
                forcedFormData: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log('Usuario actualizado con éxito');
        } catch (error) {
            console.error('Error al actualizar el artista:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <>
            <Head title="Editar Artista" />
            <Header user={auth.user} />
            <div className='main'>
                <MensajeFlash message={message} />
                <div className="contenedorReserva">
                    <div className='contenedorFormulario'>
                        <form onSubmit={handleSubmit} className='formulario' encType="multipart/form-data">
                            <h1 className="titulo">Edita el artista</h1>
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
