import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Header from '@/Components/Componentes-ATP/HeaderAdmin';
import Footer from '@/Components/Componentes-ATP/Footer';
import { Head } from '@inertiajs/react';
import MensajeFlash from '@/Components/Componentes-ATP/MensajeFlash';

const Create = ({ auth, tipos }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: '',
        saldo: '',
        apellidos: '',
        telefono: '',
        email: '',
        password: '',
        password_confirmation: '',
        usuario_tipos_id: '',
    });

    console.log(data);

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

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
        post(route('usuarios.store'), {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Crear Usuario" />
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
                            <div className='columnas'>
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
