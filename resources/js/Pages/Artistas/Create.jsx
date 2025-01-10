import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Header from '@/Components/Componentes-ATP/HeaderAdmin';
import Footer from '@/Components/Componentes-ATP/Footer';
import { Head } from '@inertiajs/react';
import MensajeFlash from '@/Components/Componentes-ATP/MensajeFlash';

const Create = ({ auth }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: '',
        apellidos: '',
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

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('artistas.store'), {
            forceFormData: true,
        });
    };

    const message = window.sessionStorage.getItem('flashMessage');

    if (message) {
        window.sessionStorage.removeItem('flashMessage');
    }

    return (
        <>
            <Head title="Crear Artista" />
            <Header user={auth.user} />
            <div className='main'>
                <MensajeFlash message={message} />
                <div className="contenedorReserva">
                    <div className='contenedorFormulario'>
                        <form onSubmit={handleSubmit} className='formulario' encType="multipart/form-data">
                            <h1 className="titulo">Crea un nuevo artista</h1>
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
                            <button type="submit" disabled={processing} className='botonFormulario'>Crear usuario</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Create;
