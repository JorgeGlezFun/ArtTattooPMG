import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Header from '@/Components/Componentes-ATP/HeaderAdmin';
import Footer from '@/Components/Componentes-ATP/Footer';
import { Head } from '@inertiajs/react';
import MensajeFlash from '@/Components/Componentes-ATP/MensajeFlash';

const Edit = ({ auth, horarios, estacion }) => {
    const { data, setData, put, processing, errors } = useForm({
        nombre: estacion.nombre,
        horas: estacion.horas.map(h => h.id.toString()) || [],
    });
    const message = window.sessionStorage.getItem('flashMessage');

    if (message) {
        window.sessionStorage.removeItem('flashMessage');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('nombre', data.nombre);
        data.horas.forEach(hora => formData.append('horas[]', hora));

        try {
            await put(route('estaciones.update', estacion.id), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log('Estación actualizada con éxito');
        } catch (error) {
            console.error('Error al actualizar la estación:', error.response ? error.response.data : error.message);
        }
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setData('horas', [...data.horas, value]);
        } else {
            setData('horas', data.horas.filter(hora => hora !== value));
        }
    };

    return (
        <>
            <Head title="Editar Estación" />
            <Header user={auth.user} />
            <div className='main'>
                <MensajeFlash message={message} />
                <div className="contenedorReserva">
                    <div className='contenedorFormulario'>
                        <form onSubmit={handleSubmit} className='formulario' encType="multipart/form-data">
                            <h1 className="titulo">Edita la estación</h1>
                            <hr className="separadorFormulario"/>
                            <div className='filaDos'>
                                <div className='columnaApellido'>
                                    <label>Nombre de la estación:</label>
                                    <input
                                        className='inputs'
                                        type="text"
                                        placeholder="Nombre de la estación"
                                        value={data.nombre}
                                        onChange={(e) => setData('nombre', e.target.value)}
                                    />
                                    {errors['nombre'] && <div>{errors['nombre']}</div>}
                                </div>
                            </div>

                            {/* Selección de horas */}
                            <div className='filaDos'>
                                <div className='columnaApellido'>
                                    <label>Selecciona las horas:</label>
                                    <div className='filaUno'>
                                        {horarios.map((horario) => (
                                            <div key={horario.id}>
                                                <input
                                                    type="checkbox"
                                                    value={horario.id}
                                                    onChange={handleCheckboxChange}
                                                    checked={data.horas.includes(horario.id.toString())}
                                                />
                                                <label>{horario.hora}</label>
                                            </div>
                                        ))}
                                    </div>
                                    {errors['horas'] && <div>{errors['horas']}</div>}
                                </div>
                            </div>

                            <button type="submit" disabled={processing} className='botonFormulario'>Actualizar estación</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Edit;
