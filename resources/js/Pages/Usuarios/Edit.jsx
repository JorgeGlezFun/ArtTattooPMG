import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Header from '@/Components/Componentes-ATP/HeaderAdmin';
import Footer from '@/Components/Componentes-ATP/Footer';
import { Head } from '@inertiajs/react';

const Edit = ({ auth, usuario, tipos }) => {
    const { data, setData, put, processing, errors } = useForm({
        nombre: usuario.nombre,
        saldo: usuario.saldo,
        usuario_tipos_id: usuario.usuario_tipos_id,
        apellidos: usuario.apellidos,
        telefono: usuario.telefono,
        // email: '',
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

    console.log(data);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await put(route('usuarios.update', usuario.id), data);
    //         console.log('Usuario actualizado con éxito');
    //     } catch (error) {
    //         console.error('Error al actualizar el usuario:', error.response ? error.response.data : error.message);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('nombre', data.nombre);
        formData.append('saldo', data.saldo);
        formData.append('usuario_tipo_id', data.usuario_tipo_id);
        formData.append('apellidos', data.apellidos);
        formData.append('telefono', data.telefono);
        // formData.append('email', data.email);

        try {
            await put(route('usuarios.update', usuario.id), formData, {
                forcedFormData: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log('Usuario actualizado con éxito');
        } catch (error) {
            console.error('Error al actualizar el usuario:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <>
            <Head title="Editar Usuario" />
            <Header user={auth.user} />
            <div className='main'>
                <div className="contenedorReserva">
                    <div className='contenedorFormulario'>
                    <form onSubmit={handleSubmit} className='formulario' encType="multipart/form-data">
                            <h1 className="titulo">Crea un nuevo usuario</h1>
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
                                <label>Tipo de usuario:</label>
                                <select className='inputs' name="usuario_tipos_id" value={data.usuario_tipos_id} onChange={handleChange}>
                                    <option value="">Selecciona un tipo de usuario</option>
                                    {tipos.map((tipo) => (
                                        <option key={tipo.id} value={tipo.id}>
                                            {tipo.nombre}
                                        </option>
                                    ))}
                                </select>
                                {errors['usuario_tipos_id'] && <div>{errors['usuario_tipos_id']}</div>}
                            </div>
                            <div className='columnas'>
                                <label>Saldo:</label>
                                <input className='inputs' type="number" name="saldo" value={data.saldo} onChange={handleChange} />
                                {errors['saldo'] && <div>{errors['saldo']}</div>}
                            </div>
                            <div className='columnas'>
                                <label>Teléfono:</label>
                                <input className='inputs' type="text" name="telefono" value={data.telefono} onChange={handleChange} />
                                {errors['telefono'] && <div>{errors['telefono']}</div>}
                            </div>
                            {/* <div className='columnas'>
                                <label>Email:</label>
                                <input className='inputs' type="email" name="email" value={data.email} onChange={handleChange} />
                                {errors['email'] && <div>{errors['email']}</div>}
                            </div>
                            <div className='columnas'>
                                <label>Contraseña:</label>
                                <input className='inputs' type="password" name="password" value={data.password} onChange={handleChange} />
                                {errors['password'] && <div>{errors['password']}</div>}
                            </div>
                            <div className='columnas'>
                                <label>Confirma la contraseña:</label>
                                <input className='inputs' type="password" name="password_confirmation" value={data.password_confirmation} onChange={handleChange} />
                                {errors['password_confirmation'] && <div>{errors['password_confirmation']}</div>}
                            </div> */}
                            <button type="submit" disabled={processing} className='botonFormulario'>Crear usuario</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Edit;
