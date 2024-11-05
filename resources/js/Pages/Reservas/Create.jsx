// Hay que borrar todo lo relacionado con los piercings y dejar solo lo de los tatuajes

import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import Header from '@/Components/Componentes-ATP/Header';
import Footer from '@/Components/Componentes-ATP/Footer';
import { Head } from '@inertiajs/react';

const Create = ({ auth, artistas }) => {
    const nombre = auth.user ? auth.user.nombre : '';
    const apellido = auth.user ? auth.user.email : '';
    const correo = auth.user ? auth.user.email : '';
    const telefono = auth.user ? auth.user.email : '';

    const { data, setData, post, processing, errors } = useForm({
        cliente: {
            nombre: '',
            apellidos: '',
            telefono: '',
            email: '',
        },
        artista_id: '',
        tatuaje: {
            ruta_imagen: null,
            precio: 0,
            tiempo: 0,
        },
        piercing: {
            nombre: '',
            precio: 0,
            tiempo: 0,
        },
        fecha: '',
        hora_inicio: '',
        hora_fin: '',
        duracion: ''
    });

    const [tipoReserva, setTipoReserva] = useState('');
    const [tatuajeOptions, setTatuajeOptions] = useState({
        tamano: '',
        relleno: '',
        color: '',
        zona: ''
    });

    const [tipoPiercing, setTipoPiercing] = useState('');
    const [availableHours, setAvailableHours] = useState([]);

    useEffect(() => {
        calcularTiempoTatuaje();
    }, [tatuajeOptions]);

    useEffect(() => {
        calcularTiempoPiercing();
    }, [tipoPiercing]);

    useEffect(() => {
        if (data.fecha) {
        verificarDisponibilidad(data.fecha);
        }
    }, [data.hora_inicio, data.tatuaje.tiempo, data.piercing.tiempo, data.fecha]);

    useEffect(() => {
        if (data.fecha) {
            fetchHorasDisponibles(data.fecha);
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
        calcularPrecioTatuaje({ ...tatuajeOptions, [name]: value });
    };

    const handlePiercingOptionsChange = (e) => {
        const { value } = e.target;
        setTipoPiercing(value);
        calcularPrecioPiercing(value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('tatuaje', { ...data.tatuaje, ruta_imagen: file });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('reservas.store'), {
            forceFormData: true,
        });
    };

    const calcularPrecioTatuaje = (options) => {
        let precio = 0;

        switch (options.tamano) {
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

    const calcularPrecioPiercing = (tipo) => {
        let precio = 0;

        const piercings30 = ['Ceja','Lengua clásico', 'Industrial'];
        if (piercings30.includes(tipo)) {
            precio = 30;
        } else {
            precio = 25;
        }

        setData('piercing', { ...data.piercing, precio, nombre: tipo });
    };

    const calcularTiempoTatuaje = () => {
        let tiempo = 0;

        switch (tatuajeOptions.tamano) {
            case 'Grande':
                tiempo += 180; // 3 horas en minutos
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

        setData('tatuaje', { ...data.tatuaje, tiempo });
    };

    const calcularTiempoPiercing = () => {
        let tiempo = 60;
        setData('piercing', { ...data.piercing, tiempo });
    }

    const verificarDisponibilidad = (fecha) => {
        if ((!data.hora_inicio || (!data.tatuaje.tiempo || !data.piercing.tiempo)) && tipoReserva) {
            return;
        }

        console.log(((!data.hora_inicio || (!data.tatuaje.tiempo || !data.piercing.tiempo)) && tipoReserva));

        axios.get('/api/ultima-hora-fin', {
            params: { fecha: fecha },
        })
        .then(response => {
            const reservas = response.data;
            let minutosTotales = [];

            const horaFinTatuaje = new Date();
            const horaFinPiercing = new Date();

            reservas.forEach(reserva => {
                const primeraHora = reserva.hora_inicio.split(':').map(Number);
                const primeraHoraMinutos = primeraHora[0] * 60 + primeraHora[1];
                minutosTotales.push(primeraHoraMinutos);
            });

            const [horas, minutos] = data.hora_inicio.split(':').map(Number);
            const minutosTotalesInicio = horas * 60 + minutos;

            const minutosTotalesFinTatuaje = horas * 60 + minutos + data.tatuaje.tiempo;
            horaFinTatuaje.setHours(0, minutosTotalesFinTatuaje, 0, 0);
            const duracionTatuaje = Math.ceil(data.tatuaje.tiempo / 60);
            const horaFinStringTatuaje = horaFinTatuaje.toTimeString().slice(0, 5);

            const minutosTotalesFinPiercing = horas * 60 + minutos + data.piercing.tiempo;
            horaFinPiercing.setHours(0, minutosTotalesFinPiercing, 0, 0);
            const duracionPiercing = Math.ceil(data.piercing.tiempo / 60);
            const horaFinStringPiercing = horaFinPiercing.toTimeString().slice(0, 5);

            let horaReservaMinima = minutosTotales == [] ? 0 : Math.min(...minutosTotales);

            let duracion = tipoReserva === 'tatuaje' ? duracionTatuaje : duracionPiercing;

            let horaFinString = tipoReserva === 'tatuaje' ? horaFinStringTatuaje : horaFinStringPiercing;

            console.log('La hora de inicio es: ', minutosTotalesInicio);
            console.log('La hora de reserva minima es: ', horaReservaMinima);
            console.log('La hora de fin del tatuaje es: ', minutosTotalesFinTatuaje);
            console.log('La hora de fin del piercing es: ', minutosTotalesFinPiercing);
            console.log('La hora de fin del tatuaje es: ', horaFinString);
            console.log('Los minutos totales de inicio: ', minutosTotalesInicio, 'son menores o iguales a la hora de reserva minima: ', horaReservaMinima);
            console.log('Los minutos totales de fin del tatuaje: ', minutosTotalesFinTatuaje, 'son mayores o iguales a la hora de reserva minima: ', horaReservaMinima);
            console.log('Los minutos totales de fin del piercing: ', minutosTotalesFinPiercing, 'son mayores o iguales a la hora de reserva minima: ', horaReservaMinima);

            console.log('¿horaFinString:', horaFinString, 'es mayor que las 14:30?', horaFinString > '14:30');
            console.log('¿horaFinString:', horaFinString, 'es menor que las 21:30?', horaFinString < '21:30');

            console.log('¿Se cumple el primer if?', (minutosTotalesInicio <= horaReservaMinima) && ((minutosTotalesFinTatuaje >= horaReservaMinima) || (minutosTotalesFinPiercing >= horaReservaMinima)));
            console.log('¿Se cumple el segundo if?', (['11:30', '12:30', '13:30'].includes(data.hora_inicio) && (horaFinString > '14:30' || horaFinString < '21:30')))

            if ((minutosTotalesInicio <= horaReservaMinima) && ((minutosTotalesFinTatuaje >= horaReservaMinima) || (minutosTotalesFinPiercing >= horaReservaMinima))) {
                setData(prevState => ({
                    ...prevState,
                    hora_fin: 'La reserva no es posible.',
                    duracion: 'La duración de la reserva es excesiva.'
                }));
            } else {
                if ((['11:30', '12:30', '13:30'].includes(data.hora_inicio) && horaFinString > '14:30') || horaFinString > '21:30') {
                    setData(prevState => ({
                        ...prevState,
                        hora_fin: 'La hora a la que se termina el tatuaje sobrepasa el horario permitido.',
                        duracion: 'La duración de la reserva es excesiva.'
                    }));
                } else {
                    setData(prevState => ({
                        ...prevState,
                        hora_fin: horaFinString,
                        duracion: duracion
                    }));
                }
            }
        })
    };

    function fetchHorasDisponibles(fecha) {
        let horas = ['11:30', '12:30', '13:30', '18:00', '19:00', '20:00'];
        let horasDisponibles = [...horas];

        axios.get('/api/ultima-hora-fin', {
            params: { fecha: fecha },
        })
        .then(response => {
            const reservas = response.data;

            reservas.forEach(reserva => {
                const inicio = reserva.hora_inicio;
                const duracion = reserva.duracion;

                let horaInicio = inicio.split(":");
                let hora = parseInt(horaInicio[0]);
                let minutos = horaInicio[1];

                for (let tiempo = 0; tiempo <= duracion; tiempo++) {

                    let nuevaHora = `${hora}:${minutos}`;

                    // Verifica si la hora existe en el array antes de eliminarla
                    let index = horasDisponibles.indexOf(nuevaHora);
                    if (index !== -1) {
                        horasDisponibles.splice(index, 1);
                    }

                    // Incrementa la hora
                    hora += 1;
                }
            });

            setAvailableHours(horasDisponibles);
        })

        .catch(error => {
            console.error("Error recogiendo las horas disponibles", error);
            setAvailableHours("No hay horas disponibles");
        });
    };

    const desactivarDiasInvalidos = (e) => {
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
        <>
            <Head title="Inicio" />
            <Header user={auth.user} />
            <div className='mainReserva'>
                <div className="contenedorReserva">
                    <div className='contenedorFormulario'>
                        <form onSubmit={handleSubmit} className='formulario' encType="multipart/form-data">
                            <h1 className="titulo">Reserva tu cita</h1>
                            <hr className="separadorFormulario"/>
                            <div className='filaUno'>
                                <div className='columnaNombre'>
                                    <label>Nombre:</label>
                                    <input className='inputs' type="text" name="cliente.nombre" value={data.cliente.nombre} onChange={handleChange} />
                                    {errors['cliente.nombre'] && <div>{errors['cliente.nombre']}</div>}
                                </div>
                                <div className='columnaApellido'>
                                    <label>Apellidos:</label>
                                    <input className='inputs' type="text" name="cliente.apellidos" value={data.cliente.apellidos} onChange={handleChange} />
                                    {errors['cliente.apellidos'] && <div>{errors['cliente.apellidos']}</div>}
                                </div>
                            </div>
                            <div className='columnas'>
                                <label>Teléfono:</label>
                                <input className='inputs' type="text" name="cliente.telefono" value={data.cliente.telefono} onChange={handleChange} />
                                {errors['cliente.telefono'] && <div>{errors['cliente.telefono']}</div>}
                            </div>
                            <div className='columnas'>
                                <label>Email:</label>
                                <input className='inputs' type="email" name="cliente.email" value={data.cliente.email} onChange={handleChange} />
                                {errors['cliente.email'] && <div>{errors['cliente.email']}</div>}
                            </div>
                            <div className='columnas'>
                                <label>Artista:</label>
                                <select name="artista_id" value={data.artista_id} onChange={handleChange}>
                                    <option value="">Seleccionar artista</option>
                                    {artistas.map(artista => (
                                        <option key={artista.id} value={artista.id}>{artista.nombre}</option>
                                    ))}
                                </select>
                                {errors.artista_id && <div>{errors.artista_id}</div>}
                            </div>
                            <div className='opcionesReserva'>
                                <label>Tipo de Reserva:</label>
                                <div className='opciones'>
                                    <div className='opcion'>
                                        <label>
                                            <input
                                                type="radio"
                                                value="tatuaje"
                                                checked={tipoReserva === 'tatuaje'}
                                                onChange={() => setTipoReserva('tatuaje')}
                                            />
                                            Tatuaje
                                        </label>
                                    </div>
                                    <div className='opcion'>
                                        <label>
                                            <input
                                                type="radio"
                                                value="piercing"
                                                checked={tipoReserva === 'piercing'}
                                                onChange={() => setTipoReserva('piercing')}
                                            />
                                            Piercing
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {tipoReserva === 'tatuaje' && (
                                <>
                                    <div className='columnas'>
                                        <label>Imagen de referencia:</label>
                                        <input className='inputs' type="file" name="tatuaje.ruta_imagen" onChange={handleFileChange} />
                                        {errors['tatuaje.ruta_imagen'] && <div>{errors['tatuaje.ruta_imagen']}</div>}
                                    </div>
                                    <div className='columnas'>
                                        <label>Tamaño:</label>
                                        <select name="tamano" value={tatuajeOptions.tamano} onChange={handleTatuajeOptionsChange}>
                                            <option value="">Seleccionar tamaño</option>
                                            <option value="Grande">Grande</option>
                                            <option value="Mediano">Mediano</option>
                                            <option value="Pequeño">Pequeño</option>
                                        </select>
                                    </div>
                                    <div className='columnas'>
                                        <label>Relleno:</label>
                                        <select name="relleno" value={tatuajeOptions.relleno} onChange={handleTatuajeOptionsChange}>
                                            <option value="">Seleccionar relleno</option>
                                            <option value="Con relleno">Con relleno</option>
                                            <option value="Sin relleno">Sin relleno</option>
                                        </select>
                                    </div>
                                    <div className='columnas'>
                                        <label>Color:</label>
                                        <select name="color" value={tatuajeOptions.color} onChange={handleTatuajeOptionsChange}>
                                            <option value="">Seleccionar color</option>
                                            <option value="A color">A color</option>
                                            <option value="Blanco y negro">Blanco y negro</option>
                                        </select>
                                    </div>
                                    <div className='columnas'>
                                        <label>Zona del cuerpo:</label>
                                        <select name="zona" value={tatuajeOptions.zona} onChange={handleTatuajeOptionsChange}>
                                            <option value="">Seleccionar zona</option>
                                            <option value="Brazo">Brazo</option>
                                            <option value="Pierna">Pierna</option>
                                            <option value="Espalda">Espalda</option>
                                            <option value="Costillas">Costillas</option>
                                            <option value="Pecho">Pecho</option>
                                            <option value="Barriga">Barriga</option>
                                        </select>
                                    </div>
                                    <div className='columnas'>
                                        <label>Precio Estimado:</label>
                                        <input className='inputs' type="text" value={data.tatuaje.precio} readOnly />
                                    </div>
                                </>
                            )}
                            {tipoReserva === 'piercing' && (
                                <>
                                    <div className='columnas'>
                                        <div className='columnaPiercing'>
                                            <label htmlFor="tipo_piercing">Tipo de piercing: </label>
                                            <select name="nombre" id="nombre" className='listaPiercings' value={tipoPiercing.nombre} onChange={handlePiercingOptionsChange}>
                                                <option>Selecciona un tipo de piercing: </option>
                                                <optgroup label='Oreja'>
                                                    <option value="Helix">Helix</option>
                                                    <option value="Lóbulo">Lóbulo</option>
                                                    <option value="Lóbulo alto">Lóbulo alto</option>
                                                    <option value="Industrial">Industrial</option>
                                                    <option value="Tragus">Tragus</option>
                                                    <option value="Daith">Daith</option>
                                                    <option value="Conch">Conch</option>
                                                </optgroup>
                                                <optgroup label='Nariz'>
                                                    <option value="Nostril">Nostril</option>
                                                    <option value="Septum">Septum</option>
                                                </optgroup>
                                                <optgroup label='Boca'>
                                                    <option value="Lengua clásico">Lengua clásico</option>
                                                    <option value="Medusa">Medusa</option>
                                                    <option value="Ashley">Ashley</option>
                                                    <option value="Labret vertical">Labret vertical</option>
                                                    <option value="Monroe">Monroe</option>
                                                    <option value="Madonna">Madonna</option>
                                                    <option value="Side labret">Side labret</option>
                                                </optgroup>
                                                <optgroup label='Ceja'>
                                                    <option value="Ceja">Ceja</option>
                                                </optgroup>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='columnas'>
                                        <label>Precio Estimado:</label>
                                        <input className='inputs' type="text" value={data.piercing.precio} readOnly />
                                    </div>
                                </>
                            )}
                            <div className='columnas'>
                                <label>Fecha:</label>
                                <input className='inputs' type="date" name="fecha" value={data.fecha} onChange={handleChange} onClick={desactivarDiasInvalidos} />
                                {errors.fecha && <div>{errors.fecha}</div>}
                            </div>
                            <div className='columnas'>
                                <label>Hora Inicio:</label>
                                <select name="hora_inicio" value={data.hora_inicio} onChange={handleChange}>
                                    <option value="">Seleccionar hora de inicio</option>
                                    {availableHours.map(hora => (
                                        <option key={hora} value={hora}>{hora}</option>
                                    ))}
                                </select>
                                {errors.hora_inicio && <div>{errors.hora_inicio}</div>}
                            </div>
                            <div className='columnas'>
                                <label>Hora Fin:</label>
                                <input className='inputs' type="text" name="hora_fin" value={data.hora_fin} readOnly />
                                {errors.hora_fin && <div>{errors.hora_fin}</div>}
                            </div>
                            <div className='columnas'>
                                <label>Duracion estimada:</label>
                                <input className='inputs' type="text" name="duracion" value={data.duracion} readOnly />
                                {errors.duracion && <div>{errors.duracion}</div>}
                            </div>
                            <button type="submit" disabled={processing}>Reservar</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Create;
