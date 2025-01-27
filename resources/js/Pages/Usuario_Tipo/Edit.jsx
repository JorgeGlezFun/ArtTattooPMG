import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Header from '@/Components/Componentes-ATP/HeaderAdmin';
import Footer from '@/Components/Componentes-ATP/Footer';
import { Head } from '@inertiajs/react';

const Edit = ({ auth, usuario_tipo }) => {
    const { data, setData, put, processing, errors } = useForm({
        nombre: usuario_tipo.nombre,
    });

    console.log(usuario_tipo)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('nombre', data.nombre);

        try {
            await put(route('usuario_tipo.update', usuario_tipo.id), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log('Tipo de característica actualizada con éxito');
        } catch (error) {
            console.error('Error al actualizar el tipo de característica:', error.response ? error.response.data : error.message);
        }
    };

    console.log(data)
    return (
        <>
            <Head title="Editar Tipo de Característica" />
            <Header user={auth.user} />
            <div className='main'>
                <div className="contenedorReserva">
                    <div className='contenedorFormulario'>
                        <form onSubmit={handleSubmit} className='formulario' encType="multipart/form-data">
                            <h1 className="titulo">Edita el tipo de usuario</h1>
                            <hr className="separadorFormulario"/>
                            <div className='filaDos'>
                                <div className='columnaApellido'>
                                    <label>Nombre del tipo de usuario:</label>
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
                            <button type="submit" disabled={processing} className='botonFormulario'>Actualizar tipo característica</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Edit;
