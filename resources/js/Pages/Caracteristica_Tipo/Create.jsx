import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Header from '@/Components/Componentes-ATP/HeaderAdmin';
import Footer from '@/Components/Componentes-ATP/Footer';
import { Head } from '@inertiajs/react';
import MensajeFlash from '@/Components/Componentes-ATP/MensajeFlash';

const Create = ({ auth }) => {
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('caracteristica_tipo.store'), {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Crear Estación" />
            <Header user={auth.user} />
            <div className='main'>
                <div className="contenedorReserva">
                    <div className='contenedorFormulario'>
                        <form onSubmit={handleSubmit} className='formulario' encType="multipart/form-data">
                            <h1 className="titulo">Crea un nuevo tipo de característica</h1>
                            <hr className="separadorFormulario"/>
                            <div className='filaDos'>
                                <div className='columnaApellido'>
                                    <label>Nombre del tipo:</label>
                                    <input
                                        className='inputs'
                                        type="text"
                                        placeholder="Nombre del tipo de característica"
                                        value={data.nombre}
                                        onChange={(e) => setData('nombre', e.target.value)}
                                    />
                                    {errors['nombre'] && <div>{errors['nombre']}</div>}
                                </div>
                            </div>
                            <button type="submit" disabled={processing} className='botonFormulario'>Crear caracteristica</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Create;
