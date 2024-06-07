import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import axios from 'axios';

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
            tiempo: 0,
        },
        piercing: {
            nombre: '',
            precio: 0,
        },
        fecha: '',
        hora_inicio: '',
        hora_fin: '',
    });

    const [tatuajeOptions, setTatuajeOptions] = useState({
        tamano: '',
        relleno: '',
        color: '',
        zona: ''
    });

    const [availableHours, setAvailableHours] = useState([]);

    useEffect(() => {
        calcularPrecioTatuaje();
        calcularTiempoTatuaje();
    }, [tatuajeOptions]);

    useEffect(() => {
        calcularHoraFin();
    }, [data.hora_inicio, data.tatuaje.tiempo]);

    useEffect(() => {
        if (data.fecha) {
            fetchAvailableHours(data.fecha);
        }
    }, [data.fecha]);

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

    const calcularTiempoTatuaje = () => {
        let tiempo = 0;

        switch (tatuajeOptions.tamano) {
            case 'Grande':
                tiempo += 240; // 4 horas en minutos
                break;
            case 'Mediano':
                tiempo += 90; // 1.5 horas en minutos
                break;
            case 'Pequeño':
                tiempo += 30; // 0.5 horas en minutos
                break;
            default:
                break;
        }

        if (tatuajeOptions.color === 'A color') {
            tiempo += 30;
        }

        if (tatuajeOptions.relleno === 'Con relleno') {
            tiempo += 30;
        }

        if (['Costillas', 'Pecho', 'Barriga'].includes(tatuajeOptions.zona)) {
            tiempo += 15;
        }

        setData('tatuaje', { ...data.tatuaje, tiempo });
    };

    const calcularHoraFin = () => {
        if (!data.hora_inicio || !data.tatuaje.tiempo) {
            return;
        }

        const [hours, minutes] = data.hora_inicio.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes + data.tatuaje.tiempo;
        const horaFin = new Date();
        horaFin.setHours(0, totalMinutes, 0, 0);

        const horaFinString = horaFin.toTimeString().slice(0, 5);

        if ((['11:30', '12:30', '13:30'].includes(data.hora_inicio) && horaFinString > '14:30') || horaFinString > '21:30') {
            setData('hora_fin', 'Hora fin no permitida');
        } else {
            setData('hora_fin', horaFinString);
        }
    };

    // const isDateInPast = (date) => {
    //     const selectedDate = new Date(date);
    //     const now = new Date();
    //     return selectedDate.setHours(0, 0, 0, 0) < now.setHours(0, 0, 0, 0);
    // };

    const getCurrentTimeString = () => {
        const now = new Date();
        return now.toTimeString().slice(0, 5);
    };

    // const isValidDate = (date) => {
    //     const selectedDate = new Date(date);
    //     const now = new Date();
    //     const diffDays = (selectedDate - now) / (1000 * 60 * 60 * 24);
    //     return diffDays >= 2;
    // };

    const fetchAvailableHours = async (date) => {
        const horas = ['11:30', '12:30', '13:30', '18:00', '19:00', '20:00'];

        try {
            const response = await axios.get(`/api/ultima-hora-fin`, {
                params: {
                    fecha: date,
                },
            });

            const ultimaHoraFin = response.data.hora_fin;

            let availableHours;

            if (ultimaHoraFin) {
                availableHours = horas.filter(time => {
                    const now = new Date();
                    if (date === now.toISOString().split('T')[0]) {
                        return time >= getCurrentTimeString() && time > ultimaHoraFin;
                    }
                    return time > ultimaHoraFin;
                });
            } else {
                // Si no hay hora_fin, simplemente mostramos todas las horas disponibles
                availableHours = horas;
            }

            setAvailableHours(availableHours);
            console.log("Prueba");
        } catch (error) {
            console.error("Error fetching available time", error);
            setAvailableHours(horas);
        }
    };


    const disableInvalidDates = (e) => {
        const dateInput = e.target;
        const today = new Date();
        const minDate = new Date(today);
        minDate.setDate(today.getDate() + 2);

        dateInput.min = minDate.toISOString().split('T')[0];

        const saturday = 6;
        const sunday = 0;

        dateInput.addEventListener('input', function (e) {
            const selectedDate = new Date(e.target.value);
            const day = selectedDate.getDay();
            if (day === saturday || day === sunday || selectedDate < minDate) {
                e.target.setCustomValidity('No se pueden seleccionar sábados, domingos o fechas con menos de 2 días de antelación.');
            } else {
                e.target.setCustomValidity('');
            }
        });
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
                            <label>Imagen:</label>
                            <input type="text" name="tatuaje.ruta_imagen" value={data.tatuaje.ruta_imagen} onChange={handleChange} />
                        </div>
                        <div className='flex flex-col'>
                            <label>Tamaño:</label>
                            <select name="tamano" value={tatuajeOptions.tamano} onChange={handleTatuajeOptionsChange}>
                                <option value="">Seleccione el tamaño</option>
                                <option value="Grande">Grande</option>
                                <option value="Mediano">Mediano</option>
                                <option value="Pequeño">Pequeño</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        <div className='flex flex-col'>
                            <label>Color:</label>
                            <select name="color" value={tatuajeOptions.color} onChange={handleTatuajeOptionsChange}>
                                <option value="">Seleccione el color</option>
                                <option value="A color">A color</option>
                                <option value="Blanco y negro">Blanco y negro</option>
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
                    </div>
                    <div className='flex flex-row'>
                        <div className='flex flex-col'>
                            <label>Zona:</label>
                            <select name="zona" value={tatuajeOptions.zona} onChange={handleTatuajeOptionsChange}>
                                <option value="">Seleccione la zona</option>
                                <option value="Brazo">Brazo</option>
                                <option value="Pierna">Pierna</option>
                                <option value="Espalda">Espalda</option>
                                <option value="Costillas">Costillas</option>
                                <option value="Pecho">Pecho</option>
                                <option value="Barriga">Barriga</option>
                            </select>
                        </div>
                    </div>
                    {errors.tatuaje && <div>{errors.tatuaje}</div>}
                </div>

                <div className='flex flex-col'>
                    <label>Fecha:</label>
                    <input type="date" name="fecha" value={data.fecha} onChange={handleChange} onFocus={disableInvalidDates} />
                    {errors.fecha && <div>{errors.fecha}</div>}
                </div>

                <div className='flex flex-col'>
                    <label>Hora de Inicio:</label>
                    <select name="hora_inicio" value={data.hora_inicio} onChange={handleChange}>
                        <option value="">Seleccione la hora de inicio</option>
                        {availableHours.map(hour => (
                            <option key={hour} value={hour}>{hour}</option>
                        ))}
                    </select>
                    {errors.hora_inicio && <div>{errors.hora_inicio}</div>}
                </div>

                <div className='flex flex-col'>
                    <label>Hora de Fin:</label>
                    <input type="text" name="hora_fin" value={data.hora_fin} readOnly />
                    {errors.hora_fin && <div>{errors.hora_fin}</div>}
                </div>

                <button type="submit" disabled={processing}>Crear Reserva</button>
            </form>
        </div>
    );
};

export default Create;
