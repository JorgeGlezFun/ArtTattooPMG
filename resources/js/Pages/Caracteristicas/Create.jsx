import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Header from '@/Components/Componentes-ATP/HeaderAdmin';
import Footer from '@/Components/Componentes-ATP/Footer';
import { Head } from '@inertiajs/react';

const Create = ({ auth, tipos }) => {
    const { data, setData, post, processing, errors } = useForm({
        caracteristica_tipos_id: '',
        nombre: '',
        precio: '',
        tiempo: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('caracteristicas.store'), {
            forceFormData: true,
        });
    };

    console.log(data);

    return (
        <>
            <Head title="Crear Estación" />
            <Header user={auth.user} />
            <div className='main'>
                <div className="contenedorReserva">
                    <div className='contenedorFormulario'>
                        <form onSubmit={handleSubmit} className='formulario' encType="multipart/form-data">
                            <h1 className="titulo">Crea una nueva característica</h1>
                            <hr className="separadorFormulario"/>
                            <div className='filaDos'>
                                <div className='columnas'>
                                    <label>Tipo:</label>
                                    <select className='listaTatuajes' name="caracteristica_tipos_id" value={data.caracteristica_tipos_id} onChange={(e) => setData('caracteristica_tipos_id', e.target.value)}>
                                        <option value="">Seleccionar tipo</option>
                                        {tipos.map(tipo => (
                                            <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                                        ))}
                                    </select>
                                    {errors.caracteristica_tipos_id && <div>{errors.caracteristica_tipos_id}</div>}
                                </div>
                                <div className='columnaApellido'>
                                    <label>Nombre de la característica:</label>
                                    <input
                                        className='inputs'
                                        type="text"
                                        placeholder="Nombre de la característica"
                                        value={data.nombre}
                                        onChange={(e) => setData('nombre', e.target.value)}
                                    />
                                    {errors['nombre'] && <div>{errors['nombre']}</div>}
                                </div>
                                <div className='columnaApellido'>
                                    <label>Precio:</label>
                                    <input
                                        className='inputs'
                                        type="text"
                                        placeholder="Precio de la aplicación de la característica"
                                        value={data.precio}
                                        onChange={(e) => setData('precio', e.target.value)}
                                    />
                                    {errors['precio'] && <div>{errors['precio']}</div>}
                                </div>
                                <div className='columnaApellido'>
                                    <label>Tiempo:</label>
                                    <input
                                        className='inputs'
                                        type="number"
                                        placeholder="Tiempo que dura la realización de la característica (en horas)"
                                        value={data.tiempo}
                                        onChange={(e) => setData('tiempo', e.target.value)}
                                    />
                                    {errors['tiempo'] && <div>{errors['tiempo']}</div>}
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
