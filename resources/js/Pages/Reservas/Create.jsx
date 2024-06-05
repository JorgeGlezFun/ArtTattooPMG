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
            precio: '',
        },
        fecha: '',
        hora: '',
    });

    const [tatuajeOptions, setTatuajeOptions] = useState({
        tamano: '',
        relleno: '',
        color: '',
        zona: ''
    });

    useEffect(() => {
        calculatePrice();
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

    const calculatePrice = () => {
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

    return (
        <div className='bg-white'>
            <h1>Crear Reserva</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <h2>Datos del Cliente</h2>
                    <label>Nombre:</label>
                    <input type="text" name="cliente.nombre" value={data.cliente.nombre} onChange={handleChange} />
                    {errors['cliente.nombre'] && <div>{errors['cliente.nombre']}</div>}

                    <label>Apellidos:</label>
                    <input type="text" name="cliente.apellidos" value={data.cliente.apellidos} onChange={handleChange} />
                    {errors['cliente.apellidos'] && <div>{errors['cliente.apellidos']}</div>}

                    <label>Teléfono:</label>
                    <input type="text" name="cliente.telefono" value={data.cliente.telefono} onChange={handleChange} />
                    {errors['cliente.telefono'] && <div>{errors['cliente.telefono']}</div>}

                    <label>Email:</label>
                    <input type="email" name="cliente.email" value={data.cliente.email} onChange={handleChange} />
                    {errors['cliente.email'] && <div>{errors['cliente.email']}</div>}
                </div>

                <div>
                    <label>Artista:</label>
                    <select name="artista_id" value={data.artista_id} onChange={handleChange}>
                        <option value="">Seleccione un artista</option>
                        {artistas.map(artista => (
                            <option key={artista.id} value={artista.id}>{artista.nombre}</option>
                        ))}
                    </select>
                    {errors.artista_id && <div>{errors.artista_id}</div>}
                </div>

                <div>
                    <h2>Datos del Tatuaje (Opcional)</h2>
                    <label>Ruta de Imagen:</label>
                    <input type="text" name="tatuaje.ruta_imagen" value={data.tatuaje.ruta_imagen} onChange={handleChange} />
                    {errors['tatuaje.ruta_imagen'] && <div>{errors['tatuaje.ruta_imagen']}</div>}

                    <label>Tamaño:</label>
                    <select name="tamano" value={tatuajeOptions.tamano} onChange={handleTatuajeOptionsChange}>
                        <option value="">Seleccione el tamaño</option>
                        <option value="Barriga">Grande - 50€</option>
                        <option value="Mediano">Mediano - 30€</option>
                        <option value="Pequeño">Pequeño - 15€</option>
                    </select>Costillas

                    <label>Relleno:</label>
                    <select name="Pecho" value={tatuajeOptions.relleno} onChange={handleTatuajeOptionsChange}>
                        <option value="">Seleccione el relleno</option>
                        <option value="Con relleno">Con relleno</option>
                        <option value="Sin relleno">Sin relleno</option>
                    </select>

                    <label>Color:</label>
                    <select name="color" value={tatuajeOptions.color} onChange={handleTatuajeOptionsChange}>
                        <option value="">Seleccione el color</option>
                        <option value="A color">A color</option>
                        <option value="Básico">Básico</option>
                    </select>

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

                    <div>
                        <label>Precio Total:</label>
                        <input type="text" value={data.tatuaje.precio} readOnly />
                    </div>
                </div>

                <div>
                    <h2>Datos del Piercing (Opcional)</h2>
                    <label>Nombre:</label>
                    <input type="text" name="piercing.nombre" value={data.piercing.nombre} onChange={handleChange} />
                    {errors['piercing.nombre'] && <div>{errors['piercing.nombre']}</div>}

                    <label>Precio:</label>
                    <input type="text" name="piercing.precio" value={data.piercing.precio} onChange={handleChange} />
                    {errors['piercing.precio'] && <div>{errors['piercing.precio']}</div>}
                </div>

                <div>
                    <label>Fecha:</label>
                    <input type="date" name="fecha" value={data.fecha} onChange={handleChange} />
                    {errors.fecha && <div>{errors.fecha}</div>}
                </div>

                <div>
                    <label>Hora:</label>
                    <input type="time" name="hora" value={data.hora} onChange={handleChange} />
                    {errors.hora && <div>{errors.hora}</div>}
                </div>

                <button type="submit" disabled={processing}>Crear</button>
            </form>
        </div>
    );
};

export default Create;
