import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

const Create = ({ artistas }) => {
    const { data, setData, post, processing, errors } = useForm({
        cliente: {
            nombre: '',
            apellidos: '',
            telefono: '',
            email: '',
        },
        artista_id: '',
        tatuaje: {
            ruta_imagen: '',
            precio: 0,
        },
        piercing: {
            nombre: '',
            precio: 0,
        },
        fecha: '',
        hora_inicio: '',
        // hora_fin: '',
    });

    const [tatuajeOptions, setTatuajeOptions] = useState({
        tamano: '',
        relleno: '',
        color: '',
        zona: ''
    });

    useEffect(() => {
        calcularPrecioTatuaje();
    }, [tatuajeOptions]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [parent, key] = name.split('.');
        if (key) {
            setData(parent, { ...data[parent], [key]: value });
        } else {
            setData(name, value);
        }
    };

    const handleTatuajeOptionsChange = (e) => {
        const { name, value } = e.target;
        setTatuajeOptions({ ...tatuajeOptions, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('reservas.store'));
    };

    const calcularPrecioTatuaje = () => {
        let precio = 0;

        switch (tatuajeOptions.tamano) {
            case 'Grande':
                precio += 50;
                break;
            case 'Mediano':
                precio += 30;
                break;
            case 'Pequeño':
                precio += 15;
                break;
            default:
                break;
        }

        setData('tatuaje', { ...data.tatuaje, precio });
    };

    const isDateInPast = (date) => {
        const selectedDate = new Date(date);
        const now = new Date();
        return selectedDate.setHours(0, 0, 0, 0) < now.setHours(0, 0, 0, 0);
    };

    const getCurrentTimeString = () => {
        const now = new Date();
        return now.toTimeString().slice(0, 5);
    };

    return (
        <div className='bg-white'>
            <h1>Crear Reserva</h1>
            <form onSubmit={handleSubmit} className='w-96'>
                <div>
                    <h2>Datos del Cliente</h2>
                    <div className='flex flex-col'>
                        <label>Nombre:</label>
                        <input type="text" name="cliente.nombre" value={data.cliente.nombre} onChange={handleChange} />
                        {errors['cliente.nombre'] && <div>{errors['cliente.nombre']}</div>}
                    </div>
                    <div className='flex flex-col'>
                        <label>Apellidos:</label>
                        <input type="text" name="cliente.apellidos" value={data.cliente.apellidos} onChange={handleChange} />
                        {errors['cliente.apellidos'] && <div>{errors['cliente.apellidos']}</div>}
                    </div>
                    <div className='flex flex-col'>
                        <label>Teléfono:</label>
                        <input type="text" name="cliente.telefono" value={data.cliente.telefono} onChange={handleChange} />
                        {errors['cliente.telefono'] && <div>{errors['cliente.telefono']}</div>}
                    </div>
                    <div className='flex flex-col'>
                        <label>Email:</label>
                        <input type="email" name="cliente.email" value={data.cliente.email} onChange={handleChange} />
                        {errors['cliente.email'] && <div>{errors['cliente.email']}</div>}
                    </div>
                </div>

                <div className='flex flex-col'>
                    <label>Artista:</label>
                    <select name="artista_id" value={data.artista_id} onChange={handleChange}>
                        <option value="">Seleccione un artista</option>
                        {artistas.map(artista => (
                            <option key={artista.id} value={artista.id}>{artista.nombre}</option>
                        ))}
                    </select>
                    {errors.artista_id && <div>{errors.artista_id}</div>}
                </div>

                <div className='flex flex-col'>
                    <h2>Datos del Tatuaje (Opcional)</h2>
                    <div className='flex flex-row'>
                        <div className='flex flex-col'>
                            <label>Ruta de la Imagen:</label>
                            <input type="text" name="tatuaje.ruta_imagen" value={data.tatuaje.ruta_imagen} onChange={handleChange} />
                            {errors['tatuaje.ruta_imagen'] && <div>{errors['tatuaje.ruta_imagen']}</div>}
                        </div>
                        <div className='flex flex-col'>
                            <label>Tamaño:</label>
                            <select name="tamano" value={tatuajeOptions.tamano} onChange={handleTatuajeOptionsChange}>
                                <option value="">Seleccione el tamaño</option>
                                <option value="Grande">Grande - 50€</option>
                                <option value="Mediano">Mediano - 30€</option>
                                <option value="Pequeño">Pequeño - 15€</option>
                            </select>
                        </div>
                        <div className='flex flex-col'>
                            <label>Relleno:</label>
                            <select name="relleno" value={tatuajeOptions.relleno} onChange={handleTatuajeOptionsChange}>
                                <option value="">Seleccione el relleno</option>
                                <option value="Con relleno">Con relleno</option>
                                <option value="Sin relleno">Sin relleno</option>
                            </select>
                        </div>
                        <div className='flex flex-col'>
                            <label>Color:</label>
                            <select name="color" value={tatuajeOptions.color} onChange={handleTatuajeOptionsChange}>
                                <option value="">Seleccione el color</option>
                                <option value="A color">A color</option>
                                <option value="Básico">Básico</option>
                            </select>
                        </div>

                        <div className='flex flex-col'>
                            <label>Zona:</label>
                            <select name="zona" value={tatuajeOptions.zona} onChange={handleTatuajeOptionsChange}>
                                <option value="">Seleccione la zona</option>
                                <option value="Brazo">Brazo</option>
                                <option value="Antebrazo">Antebrazo</option>
                                <option value="Muslo">Muslo</option>
                                <option value="Gemelo">Gemelo</option>
                                <option value="Espalda">Espalda</option>
                                <option value="Pecho">Pecho</option>
                                <option value="Barriga">Barriga</option>
                                <option value="Costillas">Costillas</option>
                            </select>
                        </div>

                        <div className='flex flex-col'>
                            <label>Precio Total:</label>
                            <input type="text" value={data.tatuaje.precio} readOnly />
                        </div>
                    </div>
                </div>

                <div className='flex flex-col'>
                    <h2>Datos del Piercing (Opcional)</h2>
                    <div className='flex flex-row'>
                        <div className='flex flex-col'>
                            <label>Nombre:</label>
                            <input type="text" name="piercing.nombre" value={data.piercing.nombre} onChange={handleChange} />
                            {errors['piercing.nombre'] && <div>{errors['piercing.nombre']}</div>}
                        </div>
                        <div className='flex flex-col'>
                            <label>Precio:</label>
                            <input type="text" name="piercing.precio" value={data.piercing.precio} onChange={handleChange} />
                            {errors['piercing.precio'] && <div>{errors['piercing.precio']}</div>}
                        </div>
                    </div>

                </div>
                <div className='flex flex-row'>
                    <div className='flex flex-col'>
                        <label>Fecha:</label>
                        <input
                            type="date"
                            name="fecha"
                            value={data.fecha}
                            onChange={handleChange}
                            min={new Date().toISOString().split('T')[0]}
                        />
                        {errors.fecha && <div>{errors.fecha}</div>}
                    </div>

                    <div className='flex flex-col'>
                        <label>Hora:</label>
                        <select name="hora_inicio" value={data.hora_inicio} onChange={handleChange} disabled={isDateInPast(data.fecha)}>
                            <option value="">Seleccione la hora</option>
                            {['11:30', '12:30', '13:30', '18:00', '19:00', '20:00', '21:00']
                                .filter(time => {
                                    const now = new Date();
                                    if (data.fecha === now.toISOString().split('T')[0]) {
                                        return time >= getCurrentTimeString();
                                    }
                                    return true;
                                })
                                .map(time => (
                                    <option key={time} value={time}>{time}</option>
                                ))}
                        </select>
                        {errors.hora_inicio && <div>{errors.hora_inicio}</div>}
                    </div>
                </div>

                <button type="submit" disabled={processing}>Crear</button>
            </form>
        </div>
    );
};

export default Create;
